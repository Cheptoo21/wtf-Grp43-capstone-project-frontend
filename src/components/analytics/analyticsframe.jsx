export const C = {
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

export const TABS = [
  { id: "Revenue Reports", color: C.teal },
  { id: "Expense Reports", color: C.red  },
  { id: "Profit / Loss",   color: C.navy },
  { id: "Export Data",     color: C.navy },
];

export function fmt(amount) {
  return `$${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export function exportToCSV(analytics) {
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

export function SectionTitle({ children }) {
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

export function KpiCard({ label, value, accent = C.teal, sub }) {
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

export function RankBar({ item, count, max, color }) {
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

export const axisProps = {
  tick: { fontSize: 11, fill: C.textSecondary },
  axisLine: false, tickLine: false,
};
