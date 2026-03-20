import { C } from "@/utils/analytics";

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
export default RankBar