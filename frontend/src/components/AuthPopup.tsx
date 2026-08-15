import { useEffect, useState } from "react";

const SHOW_DELAY_MS = 6000; // popup opens 6s after the page loads
const SESSION_KEY = "jantatea-auth-popup-shown";

export function AuthPopup() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    // Don't re-show it every time the user navigates within the same tab session
    if (typeof window === "undefined" || sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Close on Escape key too, for accessibility
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-chai/60 px-4 backdrop-blur-sm animate-fade-rise"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-cream p-8 shadow-warm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border text-chai/60 transition-colors hover:border-chai hover:text-chai"
        >
          ✕
        </button>

        <span className="label-eyebrow text-cardamom">Janta Tea Company</span>
        <h2 className="mt-2 font-display text-3xl text-balance">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mt-2 text-sm text-chai/60">
          {mode === "login"
            ? "Log in for faster reorders and wholesale rates."
            : "Sign up to track orders and get special bulk pricing."}
        </p>

        <div className="mt-6 flex rounded-full border border-border p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                mode === m ? "bg-chai text-cream" : "text-chai/60"
              }`}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-chai"
            />
          )}
          <input
            type="text"
            placeholder="Phone or email"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-chai"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-chai"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-chai py-3.5 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-terracotta"
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-chai/50">
          {mode === "login" ? "New here? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-semibold text-chai underline underline-offset-2"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}