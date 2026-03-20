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

export const axisProps = {
  tick: { fontSize: 11, fill: C.textSecondary },
  axisLine: false, tickLine: false,
};


export const tooltipStyle = {
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