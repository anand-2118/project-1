import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "./firebaseConfig"; // Ensure correct import
import { 
  GoogleAuthProvider,
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";

const provider = new GoogleAuthProvider();

interface AuthContextProps {
  user: User | null;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async (): Promise<void> => {  
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // ✅ Ensure state updates
      console.log("Google Sign-in Success:", result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw new Error("Google sign-in failed. Please try again.");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, signUpWithEmail, signInWithEmail, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");

  }
  return context;
};
