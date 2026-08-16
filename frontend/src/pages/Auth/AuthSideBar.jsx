import React, { useState } from "react";
import { X, Mail, Lock, User, Phone, Leaf, Eye, EyeOff } from "lucide-react";

const COLORS = {
  cream: "#FAF7F2",
  white: "#FFFFFF",
  darkGreen: "#1B4332",
  darkGreenSoft: "#2D6A4F",
  gold: "#D9A441",
  text: "#3F4A44",
};

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon size={16} style={{ color: COLORS.darkGreenSoft, position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200"
        style={{ backgroundColor: "rgba(27,67,50,0.05)", border: "1px solid rgba(27,67,50,0.12)", color: COLORS.darkGreen }}
      />
    </div>
  );
}

export function AuthSidebar({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 z-[70] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(15,41,28,0.55)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 h-full z-[80] flex flex-col"
        style={{
          width: "min(400px, 100vw)",
          backgroundColor: COLORS.cream,
          boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <Leaf size={20} style={{ color: COLORS.darkGreenSoft }} />
            <span className="text-lg font-semibold" style={{ color: COLORS.darkGreen }}>
              Janta Tea
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full" style={{ backgroundColor: "rgba(27,67,50,0.06)" }}>
            <X size={18} style={{ color: COLORS.darkGreen }} />
          </button>
        </div>

        <div className="px-6">
          <div
            className="flex p-1 rounded-full mb-7"
            style={{ backgroundColor: "rgba(27,67,50,0.06)" }}
          >
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-200"
                style={
                  mode === m
                    ? { backgroundColor: COLORS.darkGreen, color: COLORS.cream }
                    : { color: COLORS.text }
                }
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {mode === "signup" && (
            <div className="mb-4">
              <Field icon={User} type="text" placeholder="Full Name" />
            </div>
          )}
          <div className="mb-4">
            <Field icon={Mail} type="email" placeholder="Email Address" />
          </div>
          {mode === "signup" && (
            <div className="mb-4">
              <Field icon={Phone} type="tel" placeholder="Phone Number" />
            </div>
          )}
          <div className="mb-2 relative">
            <Field icon={Lock} type={showPass ? "text" : "password"} placeholder="Password" />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPass ? (
                <EyeOff size={16} style={{ color: COLORS.darkGreenSoft }} />
              ) : (
                <Eye size={16} style={{ color: COLORS.darkGreenSoft }} />
              )}
            </button>
          </div>

          {mode === "login" && (
            <div className="text-right mb-6">
              <a href="#" className="text-xs font-medium" style={{ color: COLORS.darkGreenSoft }}>
                Forgot password?
              </a>
            </div>
          )}
          {mode === "signup" && <div className="mb-6" />}

          <button
            className="w-full py-3.5 rounded-xl text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] mb-5"
            style={{ backgroundColor: COLORS.darkGreen, color: COLORS.cream }}
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(27,67,50,0.12)" }} />
            <span className="text-xs" style={{ color: COLORS.text }}>or continue with</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(27,67,50,0.12)" }} />
          </div>

          <button
            className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            style={{ backgroundColor: COLORS.white, border: "1px solid rgba(27,67,50,0.15)", color: COLORS.darkGreen }}
          >
            Continue with Google
          </button>

          <p className="text-center text-xs mt-6" style={{ color: COLORS.text }}>
            {mode === "login" ? "New to Janta Tea? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="font-semibold"
              style={{ color: COLORS.darkGreen }}
            >
              {mode === "login" ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default function Preview() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ minHeight: "420px", backgroundColor: COLORS.darkGreen, position: "relative" }}>
      <div className="flex items-center justify-center h-full py-24">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
          style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
        >
          <User size={16} />
          Open Login / Signup
        </button>
      </div>
      <AuthSidebar isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}