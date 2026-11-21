// seeder.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import Medicine from "./models/medicineModel.js";
import Appointment from "./models/appointmentModel.js";
import PatientCase from "./models/patientCaseModel.js";
import Prescription from "./models/prescriptionModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB for seeding...");

    // Clear existing
    try {
      await mongoose.connection.collection("users").dropIndexes();
      console.log("Cleared legacy indexes on users collection.");
    } catch (idxErr) {
      // Ignore if collection or index doesn't exist
    }

    await User.deleteMany();
    await Medicine.deleteMany();
    await Appointment.deleteMany();
    await PatientCase.deleteMany();
    await Prescription.deleteMany();
    await Order.deleteMany();

    // 1. Create Users
    const doctor = await User.create({
      name: "Dr. Rashi Shrivastava",
      email: "dr.rashi.homeopathy@gmail.com",
      phone: "+91 98765 43210",
      password: "password123",
      role: "doctor",
      avatar: "https://images.unsplash.com/photo-1594824813637-4b7264a856be?auto=format&fit=crop&w=600&q=80",
    });

    const patient = await User.create({
      name: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      phone: "+91 98765 11223",
      password: "password123",
      role: "patient",
      bloodGroup: "O+",
      height: 165,
      weight: 58,
      address: "Flat 402, Green Valley Apts, Kolar Road, Bhopal, MP - 462042",
      emergencyContact: "+91 98222 33445 (Father)",
    });

    console.log("✅ Seeded Users: Doctor & Patient created.");

    // 2. Create Medicines
    await Medicine.create([
      {
        name: "Dr. Rashi's Complete Hair Fall Defense Kit",
        category: "Care Kits",
        tag: "Doctor Formulated",
        rating: 4.9,
        reviews: 142,
        price: 850,
        originalPrice: 1150,
        image: "https://images.unsplash.com/photo-1608248597359-254e287a2754?auto=format&fit=crop&w=400&q=80",
        description: "Holistic 3-in-1 pack: Arnica & Jaborandi Hair Tonic, Bio-combination 28, and Constitutional Root Pills.",
        stock: 25,
      },
      {
        name: "Natural Glow Eczema & Skin Allergy Ointment",
        category: "Topical Creams",
        tag: "Pure Calendula",
        rating: 4.8,
        reviews: 98,
        price: 340,
        originalPrice: 420,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
        description: "Non-steroid, soothening homeopathic topical cream with Calendula Q and Echinacea for itchy skin.",
        stock: 40,
      },
      {
        name: "Gentle Digest & Acidity Relief Drops",
        category: "Dilutions",
        tag: "Fast Acting",
        rating: 4.7,
        reviews: 115,
        price: 290,
        originalPrice: 350,
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80",
        description: "Nux Vomica 30C & Carbo Veg blend to combat hyperacidity and post-heavy-meal bloating.",
        stock: 30,
      },
      {
        name: "Child Immunity & Cold Defense Syrup",
        category: "Syrups & Tonics",
        tag: "Alcohol-Free",
        rating: 4.9,
        reviews: 210,
        price: 420,
        originalPrice: 500,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
        description: "Safe for kids 2+ years. Builds natural resistance against recurrent seasonal allergies.",
        stock: 18,
      },
    ]);

    console.log("✅ Seeded Medicines.");

    // 3. Create Sample Appointments
    await Appointment.create([
      {
        appointmentCode: "DRR-101",
        patient: patient._id,
        patientName: "Ananya Sharma",
        patientPhone: "+91 98765 11223",
        patientAge: 26,
        patientGender: "Female",
        date: "2026-11-20",
        timeSlot: "11:30 AM",
        mode: "Online Video",
        concern: "Skin & Eczema",
        symptoms: "Dry red patches and itching on elbows and hands.",
        fee: 200,
        status: "Confirmed",
        paymentStatus: "Paid",
        meetingLink: "https://meet.google.com/hpc-demo-call",
        prescriptionGiven: true,
      },
      {
        appointmentCode: "DRR-102",
        patientName: "Rahul Verma",
        patientPhone: "+91 98234 44556",
        patientAge: 34,
        patientGender: "Male",
        date: "2026-11-21",
        timeSlot: "05:15 PM",
        mode: "In-Clinic Visit",
        concern: "Gastric & Acidity",
        symptoms: "Severe burning after meals for 6 months.",
        fee: 200,
        status: "Confirmed",
        paymentStatus: "Paid",
        prescriptionGiven: false,
      },
    ]);

    console.log("✅ Seeded Appointments.");

    // 4. Create Sample Patient Case Sheet (EMR)
    await PatientCase.create({
      patient: patient._id,
      patientName: "Ananya Sharma",
      patientPhone: "+91 98765 11223",
      primaryCondition: "Atopic Eczema & Sensitive Skin",
      treatmentDuration: "4 Weeks",
      overallImprovement: 70,
      treatmentStatus: "Active Treatment",
      thermalPreference: "Chilly (Sensitive to cold wind)",
      allergies: ["Dust Mites", "Synthetic Detergents", "Sour Curd"],
      familyHistory: "Mother has Psoriasis; Grandfather had Bronchial Asthma",
      currentRemedy: "Graphites 200CH + Calendula Ointment",
      doctorNotes: "Marked improvement (70%). Itching now localized only to wrists. Tapering Graphites next visit.",
      symptomTracker: [
        { symptom: "Nighttime Itching", initialSeverity: 9, currentSeverity: 3 },
        { symptom: "Skin Redness & Flare-up", initialSeverity: 8, currentSeverity: 3 },
        { symptom: "Dry Flaky Patches", initialSeverity: 7, currentSeverity: 2 },
        { symptom: "Sleep Quality", initialSeverity: 4, currentSeverity: 9 },
      ],
      timeline: [
        {
          date: "2026-10-15",
          type: "First Case Consultation",
          notes: "Constitutional case taking completed.",
          remedy: "Sulphur 200CH starter dose",
          status: "Completed",
        },
        {
          date: "2026-10-30",
          type: "1st Follow-up (Online)",
          notes: "Itching reduced by 40%.",
          remedy: "Graphites 200CH + Calendula",
          status: "Completed",
        },
      ],
      documents: [
        {
          title: "Complete Blood Count (CBC) & ESR",
          type: "Lab Report (PDF)",
          date: "2026-10-14",
          doctorNotes: "Elevated Eosinophil count indicative of allergic diathesis.",
        },
      ],
    });

    console.log("✅ Seeded Patient Case Record.");

    console.log("🎉 Database Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
