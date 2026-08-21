import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const title = "My Profile — Janta Tea Company";
const description =
  "Update your name, mobile number, and delivery address.";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, refreshProfile, isAdmin, signOut } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "Indore",
    pincode: "",
  });

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name ?? "",
        phone: profile.phone ?? "",
        address: profile.address ?? "",
        city: profile.city ?? "Indore",
        pincode: profile.pincode ?? "",
      });
    }
  }, [profile]);

  const input =
    "w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-terracotta";

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <span className="label-eyebrow text-cardamom">Account</span>

        <h1 className="mt-3 font-display text-5xl">My Profile</h1>

        <p className="mt-2 text-sm text-chai/60">{user?.email}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/my-orders"
            className="rounded-full border border-border px-6 py-3 text-[11px] font-semibold tracking-widest uppercase hover:border-chai"
          >
            My Orders
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="rounded-full bg-cardamom px-6 py-3 text-[11px] font-semibold tracking-widest text-cream uppercase"
            >
              Admin Dashboard
            </Link>
          )}

          <button
            onClick={() => void signOut()}
            className="rounded-full border border-border px-6 py-3 text-[11px] font-semibold tracking-widest uppercase hover:border-terracotta"
          >
            Logout
          </button>
        </div>

        <form
          className="mt-10 space-y-3 rounded-3xl border border-border bg-card/60 p-6"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!user) return;

            setBusy(true);

            const { error } = await supabase
              .from("profiles")
              .upsert(
                {
                  id: user.id,
                  ...form,
                },
                {
                  onConflict: "id",
                }
              );

            setBusy(false);

            if (error) {
              toast.error(error.message);
              return;
            }

            await refreshProfile();

            toast.success("Profile saved successfully");
          }}
        >
          <input
            required
            value={form.full_name}
            onChange={(e) =>
              setForm({
                ...form,
                full_name: e.target.value,
              })
            }
            placeholder="Full Name"
            maxLength={100}
            className={input}
          />

          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            placeholder="Mobile Number"
            maxLength={20}
            className={input}
          />

          <input
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
            placeholder="Delivery Address"
            maxLength={400}
            className={input}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
              placeholder="City"
              maxLength={80}
              className={input}
            />

            <input
              value={form.pincode}
              onChange={(e) =>
                setForm({
                  ...form,
                  pincode: e.target.value,
                })
              }
              placeholder="Pincode"
              maxLength={10}
              className={input}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-chai px-8 py-3 text-[11px] font-semibold tracking-widest text-cream uppercase hover:bg-terracotta disabled:opacity-50"
          >
            {busy ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}