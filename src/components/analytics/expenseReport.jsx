import { C, axisProps, tooltipStyle } from "@/utils/analytics";
import KpiCard from "./kpiCard";
import SectionTitle from "./sectionTitle";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";
import RankBar from "./rankBar";


function ExpenseReports({ analytics, fmt, isEmpty }) {
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
        {isEmpty ? <p className="text-sm text-gray-500 text-center py-20">No data yet. Kindly add transactions to get an analysis</p> : <ResponsiveContainer width="100%" height={190}>
          <BarChart data={dayData} barSize={30} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="Transactions" fill={C.red} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>}
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

export default ExpenseReports