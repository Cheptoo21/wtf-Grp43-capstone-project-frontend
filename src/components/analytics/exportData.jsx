import { useState } from "react";
import { C } from "@/utils/analytics";
import { exportToCSV } from "@/utils/analytics";

function ExportData({ analytics, isEmpty }) {
  const [exported, setExported] = useState(false);

  const handle = () => {
    exportToCSV(analytics);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const sections = [
    { label: "Monthly Breakdown",  desc: "Sales, expenses & profit per month",               emoji: "📅" },
    { label: "Top Selling Items",  desc: `${analytics.topSellingItems.length} items tracked`, emoji: "🛍️" },
    { label: "Top Expenses",       desc: `${analytics.topExpenses.length} categories`,        emoji: "💸" },
    { label: "Daily Transactions", desc: "Activity by day of week",                           emoji: "📆" },
  ];
  

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
     <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: "16px", padding: "24px",
      }}>
        <p style={{ fontSize: "15px", fontWeight: 700, color: C.textPrimary, margin: "0 0 4px" }}>
          Export to CSV
        </p>
        <p style={{ fontSize: "12px", color: C.textSecondary, margin: "0 0 20px" }}>
          Download all your analytics data. Includes the sections below.
        </p>
         {isEmpty ? <p className="text-sm text-gray-500 text-center py-20">No data yet. Nothing to export</p> :<>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
          {sections.map((s) => (
            <div key={s.label} style={{
              display: "flex", alignItems: "center", gap: "14px",
              background: C.tealLight,
              border: `1px solid ${C.teal}22`,
              borderRadius: "10px", padding: "12px 16px",
            }}>
              <span style={{ fontSize: "18px" }}>{s.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: C.textPrimary, margin: "0 0 2px" }}>
                  {s.label}
                </p>
                <p style={{ fontSize: "11px", color: C.textSecondary, margin: 0 }}>{s.desc}</p>
              </div>
              <span style={{
                fontSize: "11px", color: C.teal,
                background: `${C.teal}18`, border: `1px solid ${C.teal}33`,
                borderRadius: "999px", padding: "3px 10px", fontWeight: 600,
              }}>Included</span>
            </div>
          ))}
        </div>

        <button
          onClick={handle}
          style={{
            width: "100%", padding: "13px", borderRadius: "10px",
            border: "none", cursor: "pointer",
            fontSize: "14px", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            transition: "all 0.2s ease",
            background: exported ? C.tealLight : C.navy,
            color: exported ? C.teal : "#ffffff",
            boxShadow: exported ? "none" : "0 2px 12px rgba(26,31,54,0.2)",
          }}
        >
          {exported ? "✓  Downloaded!" : "⬇  Export Analytics as CSV"}
        </button> </>}
      </div>
    </div>
  );
}

export default ExportData;