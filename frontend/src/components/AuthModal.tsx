import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

import { useAuthUi } from "@/lib/auth-ui";
import { supabase } from "@/integrations/supabase/client";

type Mode = "login" | "signup" | "forgot";

type FormState = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  password: "",
};

export function AuthModal() {
  const { open, setOpen } = useAuthUi();

  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);

  const [form, setForm] =
    useState<FormState>(initialForm);

  if (!open) return null;

  const updateField =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };

  const resetForm = () => {
    setForm(initialForm);
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async () => {
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log("LOGIN DATA:", data);
    console.log("LOGIN ERROR:", error);

    if (error) {
      console.error("Supabase login error:", error);

      toast.error(error.message);
      return;
    }

    if (!data.session) {
      toast.error("Login session could not be created.");
      return;
    }

    toast.success("Login successful!");

    resetForm();
    setOpen(false);
  };

  // =========================
  // SIGNUP
  // =========================

  const handleSignup = async () => {
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!name) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!phone) {
      toast.error("Please enter your mobile number.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must contain at least 6 characters.",
      );
      return;
    }

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone,
          },
        },
      });

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP ERROR:", error);

    if (error) {
      console.error(
        "Supabase signup error:",
        error,
      );

      toast.error(error.message);
      return;
    }

    // Simple signup flow.
    // No email verification message here.
    if (data.user) {
      toast.success("Account created successfully!");

      resetForm();

      // If Supabase has already created a session,
      // close the modal directly.
      if (data.session) {
        setOpen(false);
        return;
      }

      // Otherwise move to login.
      setMode("login");
      return;
    }

    toast.error("Account could not be created.");
  };

  // =========================
  // FORGOT PASSWORD
  // =========================

  const handleForgotPassword = async () => {
    const email = form.email.trim().toLowerCase();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            `${window.location.origin}/reset-password`,
        },
      );

    if (error) {
      console.error(
        "Password reset error:",
        error,
      );

      toast.error(error.message);
      return;
    }

    toast.success(
      "Password reset link has been sent to your email.",
    );

    resetForm();
    setMode("login");
  };

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      if (mode === "login") {
        await handleLogin();
      } else if (mode === "signup") {
        await handleSignup();
      } else {
        await handleForgotPassword();
      }
    } catch (error) {
      console.error(
        "Authentication error:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin,
          },
        });

      if (error) {
        console.error(
          "Google login error:",
          error,
        );

        toast.error(error.message);
      }
    } catch (error) {
      console.error(
        "Google OAuth error:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Google login failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-full border border-border bg-cream px-5 py-3 text-sm outline-none transition-colors focus:border-terracotta";

  const title =
    mode === "login"
      ? "Login"
      : mode === "signup"
        ? "Create Account"
        : "Reset Password";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-chai/50 px-4 backdrop-blur-sm"
      onClick={() => {
        if (!loading) {
          setOpen(false);
        }
      }}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-warm"
        onClick={(event) => {
          event.stopPropagation();
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <span className="label-eyebrow text-cardamom">
              Janta Tea Co.
            </span>

            <h2 className="mt-2 font-display text-3xl">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="text-xl text-chai/50 hover:text-chai"
            aria-label="Close authentication dialog"
          >
            ×
          </button>
        </div>

        {/* GOOGLE */}

        {mode !== "forgot" && (
          <>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="mt-6 w-full rounded-full border border-border bg-cream py-3 text-sm font-medium transition-colors hover:border-terracotta disabled:opacity-50"
            >
              Continue with Google
            </button>

            <div className="my-4 flex items-center gap-3 text-[11px] uppercase tracking-widest text-chai/40">
              <span className="h-px flex-1 bg-border" />

              <span>or</span>

              <span className="h-px flex-1 bg-border" />
            </div>
          </>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          {/* SIGNUP FIELDS */}

          {mode === "signup" && (
            <>
              <input
                required
                type="text"
                value={form.name}
                onChange={updateField("name")}
                placeholder="Full Name"
                autoComplete="name"
                className={inputClass}
              />

              <input
                required
                type="tel"
                value={form.phone}
                onChange={updateField("phone")}
                placeholder="Mobile Number"
                autoComplete="tel"
                className={inputClass}
              />
            </>
          )}

          {/* EMAIL */}

          <input
            required
            type="email"
            value={form.email}
            onChange={updateField("email")}
            placeholder="Email Address"
            autoComplete="email"
            className={inputClass}
          />

          {/* PASSWORD */}

          {mode !== "forgot" && (
            <input
              required
              type="password"
              value={form.password}
              onChange={updateField("password")}
              placeholder="Password"
              minLength={6}
              autoComplete={
                mode === "signup"
                  ? "new-password"
                  : "current-password"
              }
              className={inputClass}
            />
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-chai py-3 text-[11px] font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : mode === "signup"
                  ? "Create Account"
                  : "Send Reset Link"}
          </button>
        </form>

        {/* FORGOT PASSWORD */}

        {mode === "login" && (
          <button
            type="button"
            onClick={() => setMode("forgot")}
            disabled={loading}
            className="mt-3 w-full text-center text-xs text-chai/55 hover:text-terracotta"
          >
            Forgot Password?
          </button>
        )}

        {/* LOGIN / SIGNUP SWITCH */}

        {mode !== "forgot" && (
          <p className="mt-5 text-center text-sm text-chai/60">
            {mode === "signup"
              ? "Already have an account? "
              : "New user? "}

            <button
              type="button"
              onClick={() => {
                if (loading) return;

                setMode(
                  mode === "signup"
                    ? "login"
                    : "signup",
                );
              }}
              className="font-semibold text-terracotta hover:underline"
            >
              {mode === "signup"
                ? "Login"
                : "Sign up"}
            </button>
          </p>
        )}

        {/* BACK TO LOGIN */}

        {mode === "forgot" && (
          <button
            type="button"
            onClick={() => setMode("login")}
            disabled={loading}
            className="mt-5 w-full text-center text-sm font-semibold text-terracotta hover:underline"
          >
            ← Back to Login
          </button>
        )}
      </div>
    </div>
  );
}