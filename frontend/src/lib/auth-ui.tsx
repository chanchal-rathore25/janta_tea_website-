import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AuthUiContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const AuthUiContext = createContext<AuthUiContextValue | null>(null);

export function AuthUiProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <AuthUiContext.Provider value={value}>{children}</AuthUiContext.Provider>;
}

export function useAuthUi() {
  const ctx = useContext(AuthUiContext);
  if (!ctx) throw new Error("useAuthUi must be used inside AuthUiProvider");
  return ctx;
}
