import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [session, setSession] = useState(undefined);
  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(data.session);
      } catch (error) {
        console.error("Error getting session", error.message);
      }
    }
    getInitialSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session changed", session);
    });
  }, []);

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supasbase sign in error", error.message);
        return { success: false, error: error.message };
      }
      console.log("supabase sign in succes", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign in", error.message);
      return {
        success: false,
        error: "An unexpected error occured. Please try again",
      };
    }
  };
  const signOut = async () => {
    try {
      const { data, error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase sign out error", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign out succes", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected Error during Sign out", error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  };
  const signUpNewUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
      });

      if (error) {
        console.error("Supabase sign up error", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sing up success", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error with sign up ");
      return {
        success: false,
        error: error.message,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signInUser, signOut, signUpNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContextProvider;
