import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  Session,
  User,
} from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
  avatar_url: string | null;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] =
    useState<Session | null>(null);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const loadExtras = async (
    userId?: string,
  ) => {
    if (!userId) {
      setProfile(null);
      setIsAdmin(false);
      return;
    }

    try {
      const [
        profileResult,
        rolesResult,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle(),

        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId),
      ]);

      if (profileResult.error) {
        console.error(
          "Profile fetch error:",
          profileResult.error,
        );

        setProfile(null);
      } else {
        setProfile(
          (profileResult.data as Profile) ??
            null,
        );
      }

      if (rolesResult.error) {
        console.error(
          "Role fetch error:",
          rolesResult.error,
        );

        setIsAdmin(false);
      } else {
        const admin =
          (rolesResult.data ?? []).some(
            (role: { role: string }) =>
              role.role === "admin",
          );

        setIsAdmin(admin);
      }
    } catch (error) {
      console.error(
        "Auth extras error:",
        error,
      );

      setProfile(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, nextSession) => {
          if (!mounted) return;

          setSession(nextSession);

          setTimeout(() => {
            if (!mounted) return;

            void loadExtras(
              nextSession?.user?.id,
            );
          }, 0);
        },
      );

    const initializeAuth =
      async () => {
        try {
          const {
            data,
            error,
          } =
            await supabase.auth.getSession();

          if (!mounted) return;

          if (error) {
            console.error(
              "Session error:",
              error,
            );

            setSession(null);
            setProfile(null);
            setIsAdmin(false);

            return;
          }

          setSession(data.session);

          await loadExtras(
            data.session?.user?.id,
          );
        } catch (error) {
          console.error(
            "Auth initialization error:",
            error,
          );

          if (!mounted) return;

          setSession(null);
          setProfile(null);
          setIsAdmin(false);
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    void initializeAuth();

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const refreshProfile =
    async () => {
      await loadExtras(
        session?.user?.id,
      );
    };

  const signOut =
    async () => {
      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          "Sign out error:",
          error,
        );

        throw error;
      }

      setSession(null);
      setProfile(null);
      setIsAdmin(false);
    };

  const value =
    useMemo<AuthContextValue>(
      () => ({
        session,
        user:
          session?.user ?? null,
        profile,
        isAdmin,
        loading,
        refreshProfile,
        signOut,
      }),
      [
        session,
        profile,
        isAdmin,
        loading,
      ],
    );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}