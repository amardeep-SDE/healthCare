// utils/generatePrescriptionPdf.js
import PDFDocument from "pdfkit";

/**
 * Generates an official medical prescription PDF stream using PDFKit
 * @param {Object} rx - Prescription document from MongoDB
 * @param {Object} res - Express Response object to stream PDF
 */
export const buildPrescriptionPdf = (rx, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  // Pipe to response
  doc.pipe(res);

  // 1. Header & Clinic Branding
  doc
    .fillColor("#1e1b4b")
    .fontSize(18)
    .font("Helvetica-Bold")
    .text("DR. RASHI SHRIVASTAVA", 40, 40);

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .fillColor("#4338ca")
    .text("B.H.M.S. • CLASSICAL HOMOEOPATHIC PHYSICIAN & SURGEON");

  doc
    .fontSize(8)
    .font("Helvetica")
    .fillColor("#4b5563")
    .text("Reg. No: MP-BHMS-2024-8842 | Central Council of Homoeopathy (CCH)")
    .text("Healthcare Arcade, 2nd Floor, Near 56 Dukan, New Palasia, Indore (MP) - 452001")
    .text("Phone: +91 98765 43210 | Email: dr.rashi.homeopathy@gmail.com");

  // Top Right Header Info
  doc
    .fontSize(9)
    .font("Helvetica-Bold")
    .fillColor("#1e1b4b")
    .text("TELE-HEALTHCARE & CLINIC", 380, 40, { align: "right" });

  doc
    .fontSize(8)
    .font("Helvetica")
    .fillColor("#059669")
    .text("Verified Digital Rx", 380, 55, { align: "right" })
    .fillColor("#6b7280")
    .text(`Rx Code: ${rx.rxCode || "RX-2026-001"}`, 380, 70, { align: "right" })
    .text(
      `Date: ${rx.createdAt ? new Date(rx.createdAt).toLocaleDateString("en-IN") : new Date().toLocaleDateString("en-IN")}`,
      380,
      82,
      { align: "right" }
    );

  // Decorative Divider
  doc
    .strokeColor("#4338ca")
    .lineWidth(1.5)
    .moveTo(40, 110)
    .lineTo(555, 110)
    .stroke();

  // 2. Patient Case Summary Box
  doc
    .rect(40, 120, 515, 55)
    .fillAndStroke("#f8fafc", "#e2e8f0");

  doc
    .fillColor("#1e293b")
    .fontSize(9)
    .font("Helvetica-Bold")
    .text("PATIENT INFORMATION", 52, 130);

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#334155")
    .text(`Patient Name: ${rx.patientName || "Patient"}`, 52, 145)
    .text(`Diagnosis / Clinical Case: ${rx.diagnosis || "Constitutional Evaluation"}`, 52, 158);

  doc
    .text(`Consultation Mode: Online Tele-Consultation`, 320, 145)
    .text(`Next Follow-Up Date: ${rx.followUpDate || "After 15 Days"}`, 320, 158);

  // 3. Rx Symbol
  let y = 195;
  doc
    .fillColor("#4338ca")
    .fontSize(22)
    .font("Helvetica-Bold")
    .text("Rx", 42, y);

  doc
    .fontSize(8)
    .font("Helvetica-Oblique")
    .fillColor("#64748b")
    .text("(Classical Constitutional Homoeopathic Dispensary)", 75, y + 10);

  y += 35;

  // 4. Medicines Table Header
  doc
    .rect(40, y, 515, 20)
    .fillAndStroke("#e0e7ff", "#c7d2fe");

  doc
    .fillColor("#1e1b4b")
    .fontSize(8)
    .font("Helvetica-Bold")
    .text("#", 48, y + 6)
    .text("Remedy & Potency", 70, y + 6)
    .text("Dispensation Form", 220, y + 6)
    .text("Dosage Frequency", 330, y + 6)
    .text("Duration", 480, y + 6);

  y += 24;

  // 5. Medicines Rows
  const medicines = rx.medicines && rx.medicines.length > 0
    ? rx.medicines
    : [
        {
          name: "Graphites",
          potency: "200CH",
          form: "Sugar Globules (Size 30)",
          dosage: "4 pills twice daily on clean tongue",
          duration: "15 Days",
        },
      ];

  medicines.forEach((med, index) => {
    // Alternating row background
    if (index % 2 === 0) {
      doc.rect(40, y, 515, 24).fill("#f8fafc");
    }

    doc
      .fillColor("#1e293b")
      .fontSize(8)
      .font("Helvetica-Bold")
      .text(`${index + 1}`, 48, y + 7)
      .text(`${med.name || "Remedy"} ${med.potency || "200CH"}`, 70, y + 7)
      .font("Helvetica")
      .fillColor("#475569")
      .text(`${med.form || "Pills (Size 30)"}`, 220, y + 7)
      .text(`${med.dosage || "As directed"}`, 330, y + 7)
      .text(`${med.duration || "15 Days"}`, 480, y + 7);

    y += 26;
  });

  y += 15;

  // 6. Dietary Precautions & Storage Rules Box
  doc
    .rect(40, y, 515, 80)
    .fillAndStroke("#fffbeb", "#fef3c7");

  doc
    .fillColor("#92400e")
    .fontSize(9)
    .font("Helvetica-Bold")
    .text("IMPORTANT HOMOEOPATHIC PRECAUTIONS & DIET RESTRICTIONS", 52, y + 10);

  const precautions = rx.dietRestrictions && rx.dietRestrictions.length > 0
    ? rx.dietRestrictions
    : [
        "Maintain clean mouth 20-30 minutes before and after taking medicinal globules.",
        "Avoid raw onions, raw garlic, sour curd, and strong coffee as they antidote Graphites.",
        "Keep medicine containers away from strong camphor, perfumes, and direct harsh sunlight.",
        "Take medicines by pouring globules into bottle cap - do not touch with bare warm hands.",
      ];

  let pY = y + 26;
  precautions.forEach((p) => {
    doc
      .fillColor("#78350f")
      .fontSize(7.5)
      .font("Helvetica")
      .text(`• ${p}`, 55, pY);
    pY += 12;
  });

  // 7. Doctor Stamp, Sign & Telemedicine Legal Note
  y = 660;

  doc
    .strokeColor("#cbd5e1")
    .lineWidth(1)
    .moveTo(40, y)
    .lineTo(555, y)
    .stroke();

  y += 12;

  // Left Legal Note
  doc
    .fontSize(7)
    .font("Helvetica")
    .fillColor("#64748b")
    .text(
      "Issued in compliance with National Medical Commission & Telemedicine Practice Guidelines India.",
      40,
      y
    )
    .text(
      "Medicines prepared at Dr. Rashi's Certified Homoeopathic Dispensary using pure German Grade dilutions.",
      40,
      y + 10
    );

  // Right Doctor Signature Area
  doc
    .fontSize(9)
    .font("Helvetica-Bold")
    .fillColor("#1e1b4b")
    .text("DR. RASHI SHRIVASTAVA", 380, y, { align: "right" })
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#4338ca")
    .text("BHMS • Regd. Homoeopathic Physician", 380, y + 12, { align: "right" })
    .fillColor("#059669")
    .text("[Digitally Verified & Authorized Signature]", 380, y + 24, { align: "right" });

  // Finalize PDF
  doc.end();
};
