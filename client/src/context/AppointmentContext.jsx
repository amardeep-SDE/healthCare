// src/context/AppointmentContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_PATIENT_TRACING,
  INITIAL_ORDERS,
} from "../data/homeopathyData";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  // Appointments State
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("hp_appointments");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  // Prescriptions State
  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem("hp_prescriptions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PRESCRIPTIONS;
  });

  // Patient Tracing State
  const [patientTracing, setPatientTracing] = useState(() => {
    const saved = localStorage.getItem("hp_tracing");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PATIENT_TRACING;
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("hp_orders");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_ORDERS;
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("hp_cart");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("hp_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("hp_prescriptions", JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem("hp_tracing", JSON.stringify(patientTracing));
  }, [patientTracing]);

  useEffect(() => {
    localStorage.setItem("hp_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("hp_cart", JSON.stringify(cart));
  }, [cart]);

  // Actions
  const bookAppointment = (appointmentData) => {
    const newAppointment = {
      id: `DRR-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      paymentStatus: "Paid",
      meetingLink: appointmentData.mode.includes("Online")
        ? `https://meet.google.com/hpc-${Math.random().toString(36).substring(2, 7)}`
        : null,
      prescriptionGiven: false,
      ...appointmentData,
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Cancelled" } : app))
    );
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const addPrescription = (prescriptionData) => {
    const newPrescription = {
      id: `RX-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split("T")[0],
      doctor: "Dr. Rashi Shrivastava",
      ...prescriptionData,
    };

    setPrescriptions((prev) => [newPrescription, ...prev]);

    // Mark appointment as prescription given
    if (prescriptionData.appointmentId) {
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === prescriptionData.appointmentId
            ? { ...app, prescriptionGiven: true }
            : app
        )
      );
    }

    return newPrescription;
  };

  const updateSymptomSeverity = (symptomIndex, newSeverity) => {
    setPatientTracing((prev) => {
      const updatedSymptoms = [...prev.symptomTracker];
      updatedSymptoms[symptomIndex].currentSeverity = newSeverity;

      // Recalculate overall improvement
      const totalInitial = updatedSymptoms.reduce((acc, s) => acc + s.initialSeverity, 0);
      const totalCurrent = updatedSymptoms.reduce((acc, s) => acc + s.currentSeverity, 0);
      const improvement = Math.round(((totalInitial - totalCurrent) / totalInitial) * 100);

      return {
        ...prev,
        symptomTracker: updatedSymptoms,
        overallImprovement: Math.max(0, Math.min(100, improvement)),
      };
    });
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      items: cart.length > 0 ? cart : orderDetails.items || [],
      totalAmount: orderDetails.totalAmount,
      shippingFee: 0,
      paymentMethod: orderDetails.paymentMethod || "UPI (Online)",
      paymentStatus: "Paid",
      status: "Dispensed",
      trackingId: `DRR-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      deliveryAddress: orderDetails.deliveryAddress,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        prescriptions,
        patientTracing,
        orders,
        cart,
        bookAppointment,
        cancelAppointment,
        updateAppointmentStatus,
        addPrescription,
        updateSymptomSeverity,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
};

