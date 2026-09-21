"use client";

import { FileSpreadsheet, FileText } from "lucide-react";

import { toast } from "sonner";

import * as XLSX from "xlsx";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import { SITE_CONFIG } from "@/components/site-config";

interface WinnerItem {
  candidateName: string;

  categoryName: string;

  votes: number;
}

interface Props {
  eventName: string;

  winners: WinnerItem[];
}

export default function WinnerExport({ eventName, winners }: Props) {
  function generateRanking(
  list: WinnerItem[]
) {

  const sorted =
    [...list].sort(
      (a,b)=>
      b.votes - a.votes
    );


  let rank = 1;


  return sorted.map(
    (item,index)=>{


      if(
        index > 0 &&
        item.votes !== sorted[index-1].votes
      ){

        rank++;

      }


      return {
        ...item,
        rank
      };


    }
  );

}

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

  async function exportExcel() {
    const rows: any[] = [];

    Object.entries(groupedWinners()).forEach(([category, list]) => {
      const ranked = generateRanking(list);

      ranked.forEach((item) => {
        rows.push({
          Category: category,

          Rank:
            item.rank === 1
              ? "1st"
              : item.rank === 2
                ? "2nd"
                : item.rank === 3
                  ? "3rd"
                  : `${item.rank}th`,

          Candidate: item.candidateName,

          Votes: item.votes,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    worksheet["!cols"] = [
      {
        wch: 25,
      },
      {
        wch: 10,
      },
      {
        wch: 35,
      },
      {
        wch: 12,
      },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Official Ranking");

    XLSX.writeFile(workbook, `${eventName}-Ranking.xlsx`);

    toast.success("Excel ranking exported");
  }

  async function getBase64Image(url: string) {
    const response = await fetch(url);

    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;

      reader.readAsDataURL(blob);
    });
  }

  async function exportPDF() {
    try {
      const doc = new jsPDF("portrait", "mm", "A4");

      const width = doc.internal.pageSize.getWidth();

      const height = doc.internal.pageSize.getHeight();

      const margin = 18;

      const centerText = (text: string, y: number, size: number) => {
        doc.setFontSize(size);

        doc.text(text, width / 2, y, {
          align: "center",
        });
      };

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      const bascLogoUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_140,h_140,c_fill,f_auto,q_auto/${SITE_CONFIG.images.basu}`;

      const sscLogoUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_140,h_140,c_fill,f_auto,q_auto/${SITE_CONFIG.images.ssc}`;

      const [bascLogo, sscLogo] = await Promise.all([
        getBase64Image(bascLogoUrl),
        getBase64Image(sscLogoUrl),
      ]);

      doc.setFillColor(15, 61, 46);

      doc.rect(0, 0, width, 48, "F");

      doc.setFillColor(212, 175, 55);

      doc.rect(0, 48, width, 2, "F");

      doc.addImage(bascLogo, "PNG", 14, 8, 28, 28);

      doc.addImage(sscLogo, "PNG", width - 42, 8, 28, 28);

      doc.setTextColor(255, 255, 255);

      doc.setFont("helvetica", "bold");

      centerText("BASILAN STATE UNIVERSITY", 18, 15);

      doc.setFont("helvetica", "normal");

      centerText("SUPREME STUDENT COUNCIL", 27, 10);

      centerText(eventName.toUpperCase(), 37, 12);

      doc.setTextColor(10, 42, 31);

      doc.setFont("helvetica", "bold");

      centerText("PEOPLE'S CHOICE AWARD", 65, 15);

      centerText("OFFICIAL WINNERS RANKING REPORT", 74, 11);

      doc.setDrawColor(212, 175, 55);

      doc.line(width / 2 - 38, 78, width / 2 + 38, 78);

      doc.setFontSize(9);

      doc.setTextColor(70, 70, 70);

      doc.text(
        "This official document presents the final ranking of candidates based on the total votes received during the Parageyan 2026 People's Choice Award.",
        margin,
        92,
        {
          maxWidth: width - margin * 2,
        },
      );

      let y = 110;

      Object.entries(groupedWinners()).forEach(([category, list]) => {
        const ranked = generateRanking(list);

        if (y > height - 60) {
          doc.addPage();

          y = 25;
        }

        doc.setFillColor(212, 175, 55);

        doc.roundedRect(margin, y, width - margin * 2, 10, 2, 2, "F");

        doc.setTextColor(10, 42, 31);

        doc.setFont("helvetica", "bold");

        doc.text(category.toUpperCase(), width / 2, y + 7, {
          align: "center",
        });

        y += 14;

        autoTable(doc, {
          startY: y,

          margin: {
            left: margin,
            right: margin,
          },

          head: [["Rank", "Candidate Name", "Total Votes"]],

          body: ranked.map((item) => [
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

            halign: "center",
          },

          didParseCell(data) {
            if (data.section === "body" && data.row.index === 0) {
              data.cell.styles.fillColor = [255, 248, 220];
            }
          },
        });

        y = (doc as any).lastAutoTable.finalY + 15;
      });

      doc.save(`${eventName}-Official-Ranking.pdf`);

      toast.success("PDF ranking exported");
    } catch (error) {
      console.error(error);

      toast.error("Failed to export PDF");
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={exportExcel}
        className="
flex
items-center
gap-2
rounded-xl
bg-[#0A2A1F]
px-4
py-2.5
text-sm
font-semibold
text-white
"
      >
        <FileSpreadsheet size={16} />
        Excel
      </button>

      <button
        onClick={exportPDF}
        className="
flex
items-center
gap-2
rounded-xl
bg-[#D4AF37]
px-4
py-2.5
text-sm
font-semibold
text-[#0A2A1F]
"
      >
        <FileText size={16} />
        PDF
      </button>
    </div>
  );
}
