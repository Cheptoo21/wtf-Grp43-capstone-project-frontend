import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";
import KpiCard from "./kpiCard";
import { C, axisProps, tooltipStyle } from "@/utils/analytics";
import SectionTitle from "./sectionTitle";

function ProfitLoss({ analytics, fmt, isEmpty }) {
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
        {isEmpty ? <p className="text-sm text-gray-500 text-center py-20">No data yet. Kindly add transactions to get an analysis</p> : 
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
        </ResponsiveContainer>}
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

export default ProfitLoss;