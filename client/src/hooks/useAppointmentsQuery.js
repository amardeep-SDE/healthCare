// src/hooks/useAppointmentsQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiMock";
import toast from "react-hot-toast";

export const QUERY_KEYS = {
  APPOINTMENTS: ["appointments"],
  PRESCRIPTIONS: ["prescriptions"],
  PATIENT_TRACING: ["patient_tracing"],
  MEDICINES: ["medicines"],
  PATIENTS_DIRECTORY: ["patients_directory"],
  DOCTOR_ORDERS: ["doctor_orders"],
};

// 1. Appointments Query
export const useAppointmentsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.APPOINTMENTS,
    queryFn: api.fetchAppointments,
  });
};

// 2. Book Appointment Mutation (with cache invalidation)
export const useBookAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.bookAppointment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.APPOINTMENTS });
      toast.success(`Appointment Confirmed! Booking ID: ${data.id}`, {
        duration: 5000,
        icon: "🎉",
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to book appointment");
    },
  });
};

// 3. Update Status Mutation
export const useUpdateAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updateAppointmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.APPOINTMENTS });
      toast.success("Appointment updated successfully");
    },
  });
};

// 4. Prescriptions Query
export const usePrescriptionsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PRESCRIPTIONS,
    queryFn: api.fetchPrescriptions,
  });
};

// 5. Add Prescription Mutation
export const useAddPrescriptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.addPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRESCRIPTIONS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.APPOINTMENTS });
      toast.success("Digital Prescription generated and sent to patient!", {
        icon: "📋",
      });
    },
  });
};

// 6. Patient Tracing Query
export const usePatientTracingQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PATIENT_TRACING,
    queryFn: api.fetchPatientTracing,
  });
};

// 7. Update Symptom Severity Mutation
export const useUpdateSymptomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updateSymptomSeverity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PATIENT_TRACING });
      toast.success("Health progress updated!");
    },
  });
};

// 8. Medicines Query
export const useMedicinesQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.MEDICINES,
    queryFn: api.fetchMedicines,
  });
};

// 9. Patients Directory Query (1000+ Patient Management for Dr. Rashi)
export const usePatientsDirectoryQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PATIENTS_DIRECTORY,
    queryFn: api.fetchPatientsDirectory,
  });
};

// 10. Update Patient Clinical Note
export const useUpdatePatientNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updatePatientNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PATIENTS_DIRECTORY });
      toast.success("Clinical note updated in patient's file");
    },
  });
};

// 11. Doctor Orders Query
export const useDoctorOrdersQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.DOCTOR_ORDERS,
    queryFn: api.fetchDoctorOrders,
  });
};

// 12. Doctor Update Order Status
export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DOCTOR_ORDERS });
      toast.success("Order status updated successfully!");
    },
  });
};
