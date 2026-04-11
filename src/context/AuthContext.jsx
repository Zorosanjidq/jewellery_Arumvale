import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
const AuthContext = createContext(undefined);
async function fetchUserRole(userId) {
  const {
    data
  } = await supabase.rpc("get_user_role", {
    _user_id: userId
  });
  return data || "user";
}
async function buildAuthUser(user) {
  const role = await fetchUserRole(user.id);
  return {
    id: user.id,
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "",
    email: user.email || "",
    role
  };
}
export const AuthProvider = ({
  children
}) => {
  const [authUser, setAuthUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Set up auth state listener FIRST
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        // Use setTimeout to avoid Supabase client deadlock
        setTimeout(async () => {
          const u = await buildAuthUser(newSession.user);
          setAuthUser(u);
          setIsLoading(false);
        }, 0);
      } else {
        setAuthUser(null);
        setIsLoading(false);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(async ({
      data: {
        session: existingSession
      }
    }) => {
      setSession(existingSession);
      if (existingSession?.user) {
        const u = await buildAuthUser(existingSession.user);
        setAuthUser(u);
      }
      setIsLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  const login = async (email, password) => {
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) return {
      error: error.message
    };
    return {};
  };
  const signup = async (email, password, fullName, role) => {
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role
        }
      }
    });
    if (error) return {
      error: error.message
    };
    return {};
  };
  const logout = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    setSession(null);
  };
  return <AuthContext.Provider value={{
    user: authUser,
    session,
    isLoggedIn: !!authUser,
    isLoading,
    login,
    signup,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
