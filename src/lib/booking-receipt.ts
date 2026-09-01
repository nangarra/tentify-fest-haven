import jsPDF from "jspdf";

type AnyBooking = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  meta?: any;
};

const SEK = (value: number) =>
  new Intl.NumberFormat("sv-SE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(
    Math.round(value),
  ) + " kr";

const clean = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  const s = String(v).trim();
  return s === "" || s === "null" || s === "undefined" ? "" : s;
};

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function generateBookingReceiptPdf(booking: AnyBooking) {
  const meta = booking.meta ?? {};
  const address = meta.address ?? {};

  const total = Number(meta.totalPrice ?? 0) || 0;
  const advance = Math.round(total * 0.2);
  const remaining = total - advance;

  const bookingNumber = clean(meta.bookingNumber) || booking.id;

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const M = 56;
  let y = 0;

  // Header band (Tentify earthy tone)
  doc.setFillColor(38, 36, 33);
  doc.rect(0, 0, pageW, 96, "F");
  doc.setTextColor(245, 241, 234);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("TENTIFY", M, 46);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Kvitto", M, 66);
  doc.setFontSize(9);
  doc.text(
    `Kvittodatum: ${new Date().toLocaleDateString("sv-SE")}`,
    pageW - M,
    46,
    { align: "right" },
  );
  doc.text(`Kvittonr: ${bookingNumber}`, pageW - M, 62, { align: "right" });

  y = 128;
  doc.setTextColor(30, 28, 26);

  const sectionTitle = (title: string) => {
    if (y > pageH - 120) {
      doc.addPage();
      y = M + 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, M, y);
    y += 7;
    doc.setDrawColor(206, 198, 185);
    doc.line(M, y, pageW - M, y);
    y += 16;
  };

  const row = (label: string, value: string) => {
    if (!clean(value)) return;
    if (y > pageH - 90) {
      doc.addPage();
      y = M + 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110, 104, 96);
    doc.text(label, M, y);
    doc.setTextColor(30, 28, 26);
    const lines = doc.splitTextToSize(String(value), pageW - M - (M + 170));
    doc.text(lines, M + 170, y);
    y += 15 * lines.length;
  };

  // Seller + customer side by side
  const colW = (pageW - M * 2 - 24) / 2;
  const colRight = M + colW + 24;

  const colBlock = (x: number, title: string, entries: [string, string][], startY: number) => {
    let cy = startY;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 28, 26);
    doc.text(title, x, cy);
    cy += 7;
    doc.setDrawColor(206, 198, 185);
    doc.line(x, cy, x + colW, cy);
    cy += 16;
    entries.forEach(([label, value]) => {
      if (!clean(value)) return;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(110, 104, 96);
      doc.text(label, x, cy);
      doc.setTextColor(30, 28, 26);
      const lines = doc.splitTextToSize(String(value), colW - 100);
      doc.text(lines, x + 100, cy);
      cy += 15 * lines.length;
    });
    return cy;
  };

  const sellerEnd = colBlock(M, "Säljare", [
    ["Företag", "Nangarra Invest AB"],
    ["Org.nr", "559374-7298"],
    ["Adress", "Eslöv, Sverige"],
    ["E-post", "nicklas@nangarra.com"],
  ], y);

  const customerEnd = colBlock(colRight, "Kunduppgifter", [
    ["Namn", clean(booking.name)],
    ["E-post", clean(booking.email)],
    ["Telefon", clean(booking.phone)],
    ["Adress", clean(address.address)],
    ["Postnr", clean(address.postalCode)],
    ["Ort", clean(address.city)],
    ["Land", clean(address.country)],
  ], y);

  y = Math.max(sellerEnd, customerEnd) + 16;


  // Booking
  sectionTitle("Bokningsuppgifter");
  row("Bokningsnummer", bookingNumber);
  row("Bokningsdatum", new Date(booking.created_at).toLocaleDateString("sv-SE"));
  row("Event", clean(meta.event));
  row("Incheckning", clean(meta.checkIn));
  row("Utcheckning", clean(meta.checkOut));
  row("Antal nätter", clean(meta.nights));
  row("Tälttyp", clean(meta.tentName) || clean(meta.tentType));
  row("Antal gäster", clean(meta.guests));
  const pm = clean(meta.paymentMethod);
  row("Betalsätt", pm ? pm.charAt(0).toUpperCase() + pm.slice(1) : "");
  y += 10;

  // Add-ons
  const addOns: any[] = Array.isArray(meta.addOns) ? meta.addOns : [];
  if (addOns.length > 0) {
    sectionTitle("Tillval");
    addOns.forEach((a) => {
      const qty = Number(a.qty ?? 1) || 1;
      const label = `${clean(a.name)}${qty > 1 ? ` × ${qty}` : ""}`;
      row(label, a.total !== undefined ? SEK(Number(a.total) || 0) : "");
    });
    y += 10;
  }

  // Payment
  sectionTitle("Betalning");
  if (meta.tentBasePrice) row("Tält", SEK(Number(meta.tentBasePrice)));
  if (meta.extraGuestsCost) row("Extra gäster", SEK(Number(meta.extraGuestsCost)));
  if (meta.addOnsTotal) row("Tillval totalt", SEK(Number(meta.addOnsTotal)));

  if (y > pageH - 150) {
    doc.addPage();
    y = M + 20;
  }
  y += 6;
  doc.setFillColor(245, 241, 234);
  doc.roundedRect(M, y, pageW - M * 2, 86, 6, 6, "F");
  const boxX = M + 16;
  let boxY = y + 24;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 65, 59);
  doc.text("Totalt bokningsbelopp", boxX, boxY);
  doc.text(SEK(total), pageW - M - 16, boxY, { align: "right" });
  boxY += 20;
  doc.text("Mottagen förskottsbetalning (20 %)", boxX, boxY);
  doc.text(SEK(advance), pageW - M - 16, boxY, { align: "right" });
  boxY += 22;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 28, 26);
  doc.text("Återstående att betala", boxX, boxY);
  doc.text(SEK(remaining), pageW - M - 16, boxY, { align: "right" });
  y += 86 + 30;

  if (y > pageH - 110) {
    doc.addPage();
    y = M + 20;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(30, 28, 26);
  doc.text("Förskottsbetalning är mottagen och bokningen är bekräftad.", M, y);
  y += 18;
  doc.text("Välkommen till Tentify Glamping @ Sweden Rock!", M, y);

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(140, 133, 124);
  doc.text(
    "Nangarra Invest AB · Org.nr 559374-7298 · Eslöv, Sverige · nicklas@nangarra.com",
    pageW / 2,
    pageH - 40,
    { align: "center" },
  );

  const fileName = `Tentify-kvitto-${slug(bookingNumber)}-${slug(booking.name || "kund")}.pdf`;
  doc.save(fileName);
  return fileName;
}
