import { C, axisProps, tooltipStyle } from "@/utils/analytics";
import KpiCard from "./kpiCard";
import SectionTitle from "./sectionTitle";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";
import RankBar from "./rankBar";
export function RevenueReports({ analytics, fmt, isEmpty }) {

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
        
        {isEmpty ? <p className="text-sm text-gray-500 text-center py-20">No data yet. Kindly add transactions to get an analysis</p> : 

        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={monthlyData} barSize={30} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} formatter={(v) => [fmt(v), "Sales"]} />
            <Bar dataKey="Sales" fill={C.teal} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        }
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