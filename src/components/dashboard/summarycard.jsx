// src/components/dashboard/SummaryCard.jsx
export default function SummaryCard({ title, amount, subtitle, action }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold text-gray-800 mt-2">{amount}</h3>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
      )}

      {action && (
        <button className="mt-4 text-sm text-emerald-600 border border-emerald-500 px-3 py-1 rounded-lg">
          {action}
        </button>
      )}
    </div>
  )
}