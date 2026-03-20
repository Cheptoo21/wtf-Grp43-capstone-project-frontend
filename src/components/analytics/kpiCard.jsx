import { C } from "@/utils/analytics"; 

const KpiCard = ({ label, value, accent = C.teal, sub }) => {
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

export default KpiCard
