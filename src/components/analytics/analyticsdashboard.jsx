import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";

// ── VoxLedger design tokens ───────────────────────────────────────────────────
const C = {
  pageBg:    "#f3f4f6",
  card:      "#ffffff",
  navy:      "#1a1f36",
  teal:      "#00c896",
  tealLight: "#e6faf5",
  red:       "#ef4444",
  redLight:  "#fef2f2",
  textPrimary:   "#111827",
  textSecondary: "#6b7280",
  border:    "#e5e7eb",
  borderLight: "#f3f4f6",
};

const TABS = [
  { id: "Revenue Reports", color: C.teal },
  { id: "Expense Reports", color: C.red  },
  { id: "Profit / Loss",   color: C.navy },
  { id: "Export Data",     color: C.navy },
];

function fmt(amount) {
  return `$${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

function exportToCSV(analytics) {
  const rows = [];
  rows.push(["Monthly Breakdown"]);
  rows.push(["Month", "Sales", "Expenses", "Profit"]);
  Object.entries(analytics.monthlyBreakdown).forEach(([month, d]) => {
    rows.push([month, d.sales, d.expenses, d.profit]);
  });
  rows.push([]);
  rows.push(["Top Selling Items"]);
  rows.push(["Item", "Count"]);
  analytics.topSellingItems.forEach((r) => rows.push([r.item, r.count]));
  rows.push([]);
  rows.push(["Top Expenses"]);
  rows.push(["Item", "Count"]);
  analytics.topExpenses.forEach((r) => rows.push([r.item, r.count]));
  rows.push([]);
  rows.push(["Transactions by Day of Week"]);
  rows.push(["Day", "Count"]);
  Object.entries(analytics.transactionsByDayOfWeek).forEach(([day, count]) => {
    rows.push([day, count]);
  });
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `analytics_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <p style={{
      fontSize: "12px", fontWeight: 600,
      color: C.textSecondary,
      textTransform: "uppercase", letterSpacing: "0.08em",
      margin: "0 0 12px",
    }}>
      {children}
    </p>
  );
}

function KpiCard({ label, value, accent = C.teal, sub }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: "12px",
      padding: "16px 18px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "3px",
        background: `linear-gradient(90deg, ${accent}, ${accent}44)`,
      }} />
      <p style={{ fontSize: "11px", color: C.textSecondary, margin: "0 0 6px", fontWeight: 500 }}>
        {label}
      </p>
      <p style={{ fontSize: "20px", fontWeight: 700, color: C.textPrimary, margin: 0, lineHeight: 1.2 }}>
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: "11px", color: accent, margin: "4px 0 0", fontWeight: 500 }}>{sub}</p>
      )}
    </div>
  );
}

function RankBar({ item, count, max, color }) {
  const pct = Math.round((count / max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "7px 0" }}>
      <span style={{
        fontSize: "12px", color: C.textPrimary, fontWeight: 500,
        width: "110px", overflow: "hidden",
        textOverflow: "ellipsis", whiteSpace: "nowrap",
        textTransform: "capitalize",
      }}>{item}</span>
      <div style={{
        flex: 1, background: C.borderLight,
        borderRadius: "999px", height: "7px", overflow: "hidden",
      }}>
        <div style={{
          height: "7px", borderRadius: "999px",
          width: `${pct}%`, background: color,
          transition: "width 0.5s ease",
        }} />
      </div>
      <span style={{ fontSize: "12px", color, fontWeight: 700, width: "24px", textAlign: "right" }}>
        {count}
      </span>
    </div>
  );
}

const tooltipStyle = {
  contentStyle: {
    background: C.navy,
    border: "none",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#f9fafb",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    padding: "8px 14px",
  },
  labelStyle: { color: "#9ca3af", marginBottom: "2px" },
  cursor: { fill: `${C.teal}08` },
};

const axisProps = {
  tick: { fontSize: 11, fill: C.textSecondary },
  axisLine: false, tickLine: false,
};

// ── Tab panels ────────────────────────────────────────────────────────────────

function RevenueReports({ analytics }) {
  const monthlyData = Object.entries(analytics.monthlyBreakdown).map(([month, d]) => ({
    month, Sales: d.sales,
  }));
  const totalSales = Object.values(analytics.monthlyBreakdown).reduce((s, d) => s + d.sales, 0);
  const bestMonth  = Object.entries(analytics.monthlyBreakdown).sort((a, b) => b[1].sales - a[1].sales)[0]?.[0] ?? "—";
  const maxCount   = Math.max(...analytics.topSellingItems.map((i) => i.count), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
        <KpiCard label="Total Revenue" value={fmt(totalSales)} accent={C.teal} />
        <KpiCard label="Best Month"    value={bestMonth}       accent={C.teal} />
        <KpiCard label="Top Item"      value={analytics.topSellingItems[0]?.item ?? "—"} accent={C.teal} />
      </div>

      <div style={{ background: C.card, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "20px" }}>
        <SectionTitle>Monthly Sales</SectionTitle>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={monthlyData} barSize={30} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} formatter={(v) => [fmt(v), "Sales"]} />
            <Bar dataKey="Sales" fill={C.teal} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: C.card, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "20px" }}>
        <SectionTitle>Top Selling Items</SectionTitle>
        {analytics.topSellingItems.map((r) => (
          <RankBar key={r.item} item={r.item} count={r.count} max={maxCount} color={C.teal} />
        ))}
      </div>
    </div>
  );
}

function ExpenseReports({ analytics }) {
  const maxCount      = Math.max(...analytics.topExpenses.map((i) => i.count), 1);
  const totalExpenses = Object.values(analytics.monthlyBreakdown).reduce((s, d) => s + d.expenses, 0);
  const busiestDay    = Object.entries(analytics.transactionsByDayOfWeek).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  const dayData       = Object.entries(analytics.transactionsByDayOfWeek).map(([day, count]) => ({
    day: day.slice(0, 3), Transactions: count,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
        <KpiCard label="Total Expenses" value={fmt(totalExpenses)} accent={C.red} />
        <KpiCard label="Top Expense"    value={analytics.topExpenses[0]?.item ?? "—"} accent={C.red} />
        <KpiCard label="Busiest Day"    value={busiestDay} accent={C.red} />
      </div>

      <div style={{ background: C.card, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "20px" }}>
        <SectionTitle>Transactions by Day of Week</SectionTitle>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={dayData} barSize={30} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="Transactions" fill={C.red} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: C.card, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "20px" }}>
        <SectionTitle>Top Expense Categories</SectionTitle>
        {analytics.topExpenses.map((r) => (
          <RankBar key={r.item} item={r.item} count={r.count} max={maxCount} color={C.red} />
        ))}
      </div>
    </div>
  );
}

function ProfitLoss({ analytics }) {
  const monthlyData   = Object.entries(analytics.monthlyBreakdown).map(([month, d]) => ({
    month, Sales: d.sales, Expenses: d.expenses, Profit: d.profit,
  }));
  const totalProfit   = Object.values(analytics.monthlyBreakdown).reduce((s, d) => s + d.profit, 0);
  const totalSales    = Object.values(analytics.monthlyBreakdown).reduce((s, d) => s + d.sales, 0);
  const totalExpenses = Object.values(analytics.monthlyBreakdown).reduce((s, d) => s + d.expenses, 0);
  const margin        = totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0;
  const profitColor   = totalProfit >= 0 ? C.teal : C.red;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px" }}>
        <KpiCard label="Total Sales"    value={fmt(totalSales)}    accent={C.teal} />
        <KpiCard label="Total Expenses" value={fmt(totalExpenses)} accent={C.red}  />
        <KpiCard label="Net Profit"     value={fmt(totalProfit)}   accent={profitColor} />
        <KpiCard label="Profit Margin"  value={`${margin}%`}       accent={C.navy} />
      </div>

      <div style={{ background: C.card, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "20px" }}>
        <SectionTitle>Sales vs Expenses vs Profit</SectionTitle>
        <ResponsiveContainer width="100%" height={210}>
          <LineChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
            <XAxis dataKey="month" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} formatter={(v) => fmt(v)} />
            <Legend wrapperStyle={{ fontSize: 12, color: C.textSecondary }} />
            <Line type="monotone" dataKey="Sales"    stroke={C.teal} strokeWidth={2.5} dot={{ r: 3.5, fill: C.teal,  strokeWidth: 0 }} />
            <Line type="monotone" dataKey="Expenses" stroke={C.red}  strokeWidth={2.5} dot={{ r: 3.5, fill: C.red,   strokeWidth: 0 }} />
            <Line type="monotone" dataKey="Profit"   stroke={C.navy} strokeWidth={2.5} dot={{ r: 3.5, fill: C.navy,  strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: C.card, borderRadius: "12px", border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
          background: C.borderLight, padding: "10px 20px",
          borderBottom: `1px solid ${C.border}`,
        }}>
          {["Month", "Sales", "Expenses", "Profit"].map((h) => (
            <span key={h} style={{
              fontSize: "11px", fontWeight: 600,
              color: C.textSecondary,
              textTransform: "uppercase", letterSpacing: "0.07em",
            }}>{h}</span>
          ))}
        </div>
        {Object.entries(analytics.monthlyBreakdown).map(([month, d], i) => (
          <div key={month} style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
            padding: "12px 20px",
            borderTop: i === 0 ? "none" : `1px solid ${C.borderLight}`,
          }}>
            <span style={{ fontSize: "13px", color: C.textSecondary, fontWeight: 500 }}>{month}</span>
            <span style={{ fontSize: "13px", color: C.teal, fontWeight: 600 }}>{fmt(d.sales)}</span>
            <span style={{ fontSize: "13px", color: C.red,  fontWeight: 600 }}>{fmt(d.expenses)}</span>
            <span style={{ fontSize: "13px", color: d.profit >= 0 ? C.teal : C.red, fontWeight: 600 }}>{fmt(d.profit)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExportData({ analytics, onExport }) {
  const [exported, setExported] = useState(false);

  const handle = () => {
    onExport();
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
        </button>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("Revenue Reports");
  const { analytics, isLoading }  = useAnalytics();

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

        {/* Tab bar */}
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

        {/* Content */}
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
              {activeTab === "Revenue Reports" && <RevenueReports analytics={analytics} />}
              {activeTab === "Expense Reports" && <ExpenseReports analytics={analytics} />}
              {activeTab === "Profit / Loss"   && <ProfitLoss analytics={analytics} />}
              {activeTab === "Export Data"     && <ExportData analytics={analytics} onExport={() => exportToCSV(analytics)} />}
            </>
          )}
        </div>
      </div>
    </>
  );
}