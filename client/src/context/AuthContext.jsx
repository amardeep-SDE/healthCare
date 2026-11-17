// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("hp_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default logged in as patient for smooth demo experience
    return {
      name: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      phone: "+91 98765 11223",
      role: "patient", // "patient" | "doctor"
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "active-session-token");

  useEffect(() => {
    if (user) {
      localStorage.setItem("hp_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("hp_user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setToken("active-session-token");
    localStorage.setItem("token", "active-session-token");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("hp_user");
  };

  // Toggle role between Doctor (Dr. Rashi) and Patient (Ananya) for seamless testing
  const switchRole = (newRole) => {
    if (newRole === "doctor") {
      setUser({
        name: "Dr. Rashi Shrivastava",
        email: "dr.rashi.homeopathy@gmail.com",
        phone: "+91 98765 43210",
        role: "doctor",
        qualification: "BHMS (Gold Medalist)",
        regNo: "CCH / MP-H-2020-84912",
        avatar: "https://images.unsplash.com/photo-1594824813637-4b7264a856be?auto=format&fit=crop&w=200&q=80",
      });
    } else {
      setUser({
        name: "Ananya Sharma",
        email: "ananya.sharma@example.com",
        phone: "+91 98765 11223",
        role: "patient",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      });
    }
    setToken("active-session-token");
    localStorage.setItem("token", "active-session-token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: Boolean(user && token),
        isDoctor: user?.role === "doctor",
        login,
        logout,
        switchRole,
      }}
    >
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

