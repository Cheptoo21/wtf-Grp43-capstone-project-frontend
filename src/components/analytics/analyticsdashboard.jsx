import { useState } from "react";
import { useAnalytics } from "../hooks/useanalytics";
import { C } from "@/utils/analytics";
import { RevenueReports } from "./revenueReport";
import ProfitLoss from "./profitTable";
import ExportData from "./exportData";
import ExpenseReports from "./expenseReport";
const TABS = [
  { id: "Revenue Reports", color: C.teal },
  { id: "Expense Reports", color: C.red  },
  { id: "Profit / Loss",   color: C.navy },
  { id: "Export Data",     color: C.navy },
];

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("Revenue Reports");
  const { analytics, isLoading }  = useAnalytics();

  const isEmpty = analytics.totalSales === 0 && analytics.totalExpenses == 0;


  function fmt(amount) {
  return Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency: analytics?.currency || "NGN",
    minimumFractionDigits: 2,
  });
  }

  return (
    <>
      <style>{`
        .vox-tab:hover { opacity: 0.8; }
        .vox-scroll::-webkit-scrollbar { width: 4px; }
        .vox-scroll::-webkit-scrollbar-track { background: transparent; }
        .vox-scroll::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 999px; }
        @keyframes vox-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: C.pageBg }}>

        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px", marginBottom: "16px", flexShrink: 0 }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className="vox-tab"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: isActive ? `1.5px solid ${tab.color}` : `1px solid ${C.border}`,
                  background: isActive
                    ? tab.id === "Expense Reports" ? C.redLight : C.tealLight
                    : C.card,
                  color: isActive ? tab.color : C.textSecondary,
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  boxShadow: isActive ? `0 0 0 3px ${tab.color}14` : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.id}
              </button>
            );
          })}
        </div>
        <div className="vox-scroll" style={{ flex: 1, overflowY: "auto" }}>
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "160px", gap: "12px" }}>
              <div style={{
                width: "28px", height: "28px",
                border: `2px solid ${C.border}`, borderTopColor: C.teal,
                borderRadius: "50%", animation: "vox-spin 0.75s linear infinite",
              }} />
              <p style={{ fontSize: "12px", color: C.textSecondary }}>Loading analytics…</p>
            </div>
          ) : (
            <>
              {activeTab === "Revenue Reports" && <RevenueReports analytics={analytics} fmt={fmt} isEmpty={isEmpty}/>}
              {activeTab === "Expense Reports" && <ExpenseReports analytics={analytics} fmt={fmt} isEmpty={isEmpty}/>}
              {activeTab === "Profit / Loss"   && <ProfitLoss analytics={analytics} fmt={fmt} isEmpty={isEmpty}/>}
              {activeTab === "Export Data"     && <ExportData analytics={analytics} isEmpty={isEmpty}/>}
            </>
          )}
        </div>
      </div>
    </>
  );
}