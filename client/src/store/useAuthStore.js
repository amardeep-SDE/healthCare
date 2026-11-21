// src/store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        name: "Ananya Sharma",
        email: "ananya.sharma@example.com",
        phone: "+91 98765 11223",
        role: "patient", // "patient" | "doctor"
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      token: "active-session-token",

      login: (userData) =>
        set({
          user: userData,
          token: "active-session-token",
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),

      // Allows 1-click toggle between Dr. Rashi (Doctor) and Patient mode for demoing
      switchRole: (newRole) => {
        if (newRole === "doctor") {
          set({
            user: {
              name: "Dr. Rashi Shrivastava",
              email: "dr.rashi.homeopathy@gmail.com",
              phone: "+91 98765 43210",
              role: "doctor",
              qualification: "BHMS (Gold Medalist)",
              regNo: "CCH / MP-H-2020-84912",
              avatar: "/doctor-rashi.jpg",
            },
            token: "active-session-token",
          });
        } else {
          set({
            user: {
              name: "Ananya Sharma",
              email: "ananya.sharma@example.com",
              phone: "+91 98765 11223",
              role: "patient",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            },
            token: "active-session-token",
          });
        }
      },

      isDoctor: () => get().user?.role === "doctor",
      isLoggedIn: () => Boolean(get().user && get().token),
    }),
    {
      name: "hp-auth-storage",
    }
  )
);

