import { useState } from "react";
import { toast } from "sonner";

import { useAuthUi } from "@/lib/auth-ui";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

type Mode = "login" | "signup" | "forgot";

export function AuthModal() {
  const { open, setOpen } = useAuthUi();
  const [mode, setMode] = useState<Mode>("login");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });

  if (!open) return null;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const input =
    "w-full rounded-full border border-border bg-cream px-5 py-3 text-sm outline-none focus:border-terracotta";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email.trim(),
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        setOpen(false);
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: form.name.trim(), phone: form.phone.trim() },
          },
        });
        if (error) throw error;
        toast.success("Account created successfully.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(form.email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset link sent on your email");
        setMode("login");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something is wrong");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    setBusy(false);
    if (result.error) {
      toast.error("something is wrong");
      return;
    }
    if (result.redirected) return;
    setOpen(false);
  };

  const heading =
    mode === "login" ? "Login " : mode === "signup" ? "New User" : "Password reset";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-chai/50 px-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-warm"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={heading}
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="label-eyebrow text-cardamom">Janta Tea Co.</span>
            <h2 className="mt-2 font-display text-3xl">{heading}</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-xl leading-none text-chai/50 hover:text-chai"
          >
            ×
          </button>
        </div>

        <button
          onClick={handleGoogle}
          disabled={busy}
          className="mt-6 w-full rounded-full border border-border bg-cream py-3 text-sm font-medium transition-colors hover:border-terracotta disabled:opacity-50"
        >
          Continue to Google 
        </button>

        <div className="my-4 flex items-center gap-3 text-[11px] tracking-widest text-chai/40 uppercase">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <input
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Full Name "
                maxLength={100}
                className={input}
              />
              <input
                required
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="Enter your Mobile number"
                maxLength={20}
                className={input}
              />
            </>
          )}
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="Enter your email"
            maxLength={255}
            className={input}
          />
          {mode !== "forgot" && (
            <input
              required
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="Enter your password"
              minLength={6}
              className={input}
            />
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-chai py-3 text-[11px] font-semibold tracking-widest text-cream uppercase transition-colors hover:bg-terracotta disabled:opacity-50"
          >
            {busy
              ? "Ruko..."
              : mode === "login"
                ? "Login"
                : mode === "signup"
                  ? "Sign up"
                  : "Reset link bhejein"}
          </button>
        </form>

        {mode === "login" && (
          <button
            onClick={() => setMode("forgot")}
            className="mt-3 w-full text-center text-xs text-chai/55 hover:text-terracotta"
          >
           forgot Password ?
          </button>
        )}

        <p className="mt-5 text-center text-sm text-chai/60">
          {mode === "signup" ? "already have an account ? " : "new user ? "}
          <button
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="font-semibold text-terracotta hover:underline"
          >
            {mode === "signup" ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
