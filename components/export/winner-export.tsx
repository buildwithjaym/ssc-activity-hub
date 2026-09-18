"use client";

import { FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SITE_CONFIG } from "@/components/site-config";

interface WinnerItem {
  rank: number;
  candidateName: string;
  categoryName: string;
  votes: number;
}

interface Props {
  eventName: string;
  winners: WinnerItem[];
}

export default function WinnerExport({ eventName, winners }: Props) {
  function groupedWinners() {
    const grouped: Record<string, WinnerItem[]> = {};

    winners.forEach((item) => {
      if (!grouped[item.categoryName]) {
        grouped[item.categoryName] = [];
      }
      grouped[item.categoryName].push(item);
    });

    return grouped;
  }

  // Convert image URL → base64 (needed for jsPDF)
  async function getBase64Image(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /* ==================== EXCEL EXPORT ==================== */
  function exportExcel() {
    const rows = winners.map((item) => ({
      Category: item.categoryName,
      Rank: item.rank,
      Candidate: item.candidateName,
      Votes: item.votes,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    worksheet["!cols"] = [
      { wch: 28 },
      { wch: 10 },
      { wch: 38 },
      { wch: 12 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Official Winners");

    XLSX.writeFile(workbook, `${eventName}-Official-Winners.xlsx`);
    toast.success("Excel winners report exported");
  }

  /* ==================== PDF EXPORT ==================== */
  async function exportPDF() {
    try {
      const doc = new jsPDF("portrait", "mm", "A4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 18;

      const centerText = (text: string, y: number, size = 11) => {
        doc.setFontSize(size);
        doc.text(text, pageWidth / 2, y, { align: "center" });
      };

      // Build Cloudinary URLs from SITE_CONFIG
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      const bascLogoUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_140,h_140,c_fill,f_auto,q_auto/${SITE_CONFIG.images.basu}`;
      const sscLogoUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_140,h_140,c_fill,f_auto,q_auto/${SITE_CONFIG.images.ssc}`;

      // Load logos as base64
      const [bascLogo, sscLogo] = await Promise.all([
        getBase64Image(bascLogoUrl),
        getBase64Image(sscLogoUrl),
      ]);

      /* ---------- HEADER ---------- */
      doc.setFillColor(15, 61, 46);
      doc.rect(0, 0, pageWidth, 48, "F");

      // Gold accent line
      doc.setFillColor(212, 175, 55);
      doc.rect(0, 48, pageWidth, 1.8, "F");

      // Left logo - Basilan State College
      doc.addImage(bascLogo, "PNG", 14, 8, 28, 28);

      // Right logo - SSC
      doc.addImage(sscLogo, "PNG", pageWidth - 42, 8, 28, 28);

      // Center text
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      centerText("BASILAN STATE COLLEGE", 18, 15);

      doc.setFont("helvetica", "normal");
      centerText("SUPREME STUDENT COUNCIL", 26, 10);

      doc.setFont("helvetica", "bold");
      centerText(eventName.toUpperCase(), 36, 12);

      /* ---------- TITLE ---------- */
      doc.setTextColor(10, 42, 31);
      doc.setFont("helvetica", "bold");
      centerText("PEOPLE'S CHOICE AWARD", 64, 15);

      doc.setFont("helvetica", "normal");
      centerText("OFFICIAL WINNERS RANKING REPORT", 73, 11);

      // Gold line under title
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.6);
      doc.line(pageWidth / 2 - 38, 77, pageWidth / 2 + 38, 77);

      /* ---------- DESCRIPTION ---------- */
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);
      doc.text(
        "This official document presents the final ranking of candidates based on the total votes received during the Parageyan 2026 People's Choice Award. Results are organized by category and ranked according to the number of votes obtained within each category.",
        margin,
        90,
        { maxWidth: pageWidth - margin * 2, align: "justify" }
      );

      let y = 108;
      const categories = Object.entries(groupedWinners());

      categories.forEach(([category, list]) => {
        if (y > pageHeight - 55) {
          doc.addPage();
          y = 25;
        }

        // Category Header
        doc.setFillColor(212, 175, 55);
        doc.roundedRect(margin, y, pageWidth - margin * 2, 10, 1.5, 1.5, "F");

        doc.setTextColor(10, 42, 31);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(category.toUpperCase(), pageWidth / 2, y + 6.8, {
          align: "center",
        });

        y += 14;

        const sortedList = [...list].sort((a, b) => a.rank - b.rank);

        autoTable(doc, {
          startY: y,
          margin: { left: margin, right: margin },
          head: [["Rank", "Candidate Name", "Total Votes"]],
          body: sortedList.map((item) => [
            item.rank === 1
              ? "1st"
              : item.rank === 2
              ? "2nd"
              : item.rank === 3
              ? "3rd"
              : `${item.rank}th`,
            item.candidateName,
            item.votes.toLocaleString(),
          ]),
          theme: "grid",
          headStyles: {
            fillColor: [10, 42, 31],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 10,
            halign: "center",
            cellPadding: 4,
          },
          bodyStyles: {
            fillColor: [248, 245, 239],
            textColor: [10, 42, 31],
            fontSize: 10,
            cellPadding: 3.8,
          },
          alternateRowStyles: {
            fillColor: [255, 255, 255],
          },
          columnStyles: {
            0: { cellWidth: 28, halign: "center", fontStyle: "bold" },
            1: { cellWidth: "auto", halign: "left" },
            2: { cellWidth: 38, halign: "center" },
          },
          styles: {
            lineColor: [200, 200, 200],
            lineWidth: 0.2,
          },
          didParseCell: (data) => {
            if (data.section === "body" && data.row.index === 0) {
              data.cell.styles.fillColor = [255, 248, 220];
              data.cell.styles.fontStyle = "bold";
            }
          },
        });

        y = (doc as any).lastAutoTable.finalY + 16;
      });

      /* ---------- FOOTER ---------- */
      const pageCount = doc.getNumberOfPages();
      const generatedAt = new Date().toLocaleString("en-PH", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);

        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.setFont("helvetica", "normal");

        doc.text(
          `Generated by SSC Hub Admin Console  •  ${generatedAt}`,
          margin,
          pageHeight - 11
        );

        doc.text(
          `Page ${i} of ${pageCount}`,
          pageWidth - margin,
          pageHeight - 11,
          { align: "right" }
        );
      }

      doc.save(`${eventName}-Official-Winners.pdf`);
      toast.success("PDF winners report exported");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={exportExcel}
        className="flex items-center gap-2 rounded-xl bg-[#0A2A1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123F2A]"
      >
        <FileSpreadsheet size={16} />
        Excel
      </button>

      <button
        onClick={exportPDF}
        className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-[#0A2A1F] transition hover:brightness-105"
      >
        <FileText size={16} />
        PDF
      </button>
    </div>
  );
}