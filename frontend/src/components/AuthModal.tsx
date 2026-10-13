import { useEffect, useState } from "react";
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
  const [form, setForm] = useState<FormState>(initialForm);

  // Reset modal when closed
  useEffect(() => {
    if (!open) {
      setMode("login");
      setForm(initialForm);
      setLoading(false);
    }
  }, [open]);

  // Update form fields
  const updateField =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };

  // Reset form
  const resetForm = () => {
    setForm(initialForm);
  };

  // Close modal
  const closeModal = () => {
    if (loading) return;
    setOpen(false);
  };

  // Login
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase login error:", error);

      const message = error.message.toLowerCase();

      if (message.includes("invalid login credentials")) {
        toast.error("Invalid email or password.");
      } else if (message.includes("email not confirmed")) {
        toast.error("Please confirm your email before logging in.");
      } else {
        toast.error(error.message);
      }

      return;
    }

    if (!data.session) {
      toast.error("Login session could not be created.");
      return;
    }

    toast.success("Login successful!");

    resetForm();
    setMode("login");
    setOpen(false);
  };

  // Signup
  const handleSignup = async () => {
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!name) {
      toast.error("Please enter your full name.");
      return;
    }

    if (name.length < 2) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (!phone) {
      toast.error("Please enter your mobile number.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: cleanPhone,
        },
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);

      const message = error.message.toLowerCase();

      if (message.includes("user already registered")) {
        toast.error(
          "An account with this email already exists. Please login."
        );
      } else {
        toast.error(error.message);
      }

      return;
    }

    if (data.session) {
      toast.success("Account created successfully!");

      resetForm();
      setMode("login");
      setOpen(false);

      return;
    }

    if (data.user) {
      toast.success(
        "Account created! Please check your email to confirm your account."
      );

      resetForm();
      setMode("login");

      return;
    }

    toast.error("Account could not be created.");
  };

  // Forgot password
  const handleForgotPassword = async () => {
    const email = form.email.trim().toLowerCase();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error("Password reset error:", error);
      toast.error(error.message);
      return;
    }

    toast.success("Password reset link has been sent to your email.");

    resetForm();
    setMode("login");
  };

  // Form submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      console.error("Authentication error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Switch between login and signup
  const switchMode = (nextMode: "login" | "signup") => {
    if (loading) return;

    setMode(nextMode);

    setForm((previous) => ({
      ...previous,
      password: "",
    }));
  };

  // Modal UI
  if (!open) return null;

  const title =
    mode === "login"
      ? "Login"
      : mode === "signup"
        ? "Create Account"
        : "Reset Password";

  const inputClass =
    "w-full rounded-full border border-border bg-cream px-5 py-3 text-sm outline-none transition-colors focus:border-terracotta disabled:opacity-60";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-chai/50 px-4 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-warm"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="label-eyebrow text-cardamom">
              Janta Tea Co.
            </span>

            <h2
              id="auth-modal-title"
              className="mt-2 font-display text-3xl"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeModal}
            disabled={loading}
            className="text-xl text-chai/50 transition-colors hover:text-chai disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close authentication dialog"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          {/* Signup fields */}
          {mode === "signup" && (
            <>
              <input
                required
                disabled={loading}
                type="text"
                value={form.name}
                onChange={updateField("name")}
                placeholder="Full Name"
                autoComplete="name"
                className={inputClass}
              />

              <input
                required
                disabled={loading}
                type="tel"
                value={form.phone}
                onChange={updateField("phone")}
                placeholder="Mobile Number"
                autoComplete="tel"
                inputMode="tel"
                className={inputClass}
              />
            </>
          )}

          {/* Email */}
          <input
            required
            disabled={loading}
            type="email"
            value={form.email}
            onChange={updateField("email")}
            placeholder="Email Address"
            autoComplete="email"
            className={inputClass}
          />

          {/* Password */}
          {mode !== "forgot" && (
            <input
              required
              disabled={loading}
              type="password"
              value={form.password}
              onChange={updateField("password")}
              placeholder="Password"
              minLength={6}
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              className={inputClass}
            />
          )}

          {/* Submit */}
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

        {/* Forgot password */}
        {mode === "login" && (
          <button
            type="button"
            onClick={() => {
              if (loading) return;

              setMode("forgot");

              setForm((previous) => ({
                ...previous,
                password: "",
              }));
            }}
            disabled={loading}
            className="mt-3 w-full text-center text-xs text-chai/55 transition-colors hover:text-terracotta disabled:opacity-50"
          >
            Forgot Password?
          </button>
        )}

        {/* Login / Signup switch */}
        {mode !== "forgot" && (
          <p className="mt-5 text-center text-sm text-chai/60">
            {mode === "signup"
              ? "Already have an account? "
              : "New user? "}

            <button
              type="button"
              onClick={() =>
                switchMode(mode === "signup" ? "login" : "signup")
              }
              disabled={loading}
              className="font-semibold text-terracotta hover:underline disabled:opacity-50"
            >
              {mode === "signup" ? "Login" : "Sign up"}
            </button>
          </p>
        )}

        {/* Back to login */}
        {mode === "forgot" && (
          <button
            type="button"
            onClick={() => switchMode("login")}
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