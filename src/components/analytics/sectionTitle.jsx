import { C } from "@/utils/analytics";
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

export default SectionTitle