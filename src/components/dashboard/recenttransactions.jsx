
const transactions = [
  { label: "Sale: Digital Product", time: "Today, 2:14 PM", amount: "+$45.00", positive: true },
  { label: "Expense: Business Lunch", time: "Today, 12:30 PM", amount: "-$12.00" },
  { label: "Service: Consultation", time: "Yesterday, 4:00 PM", amount: "+$150.00", positive: true },
  { label: "Expense: Electricity Bill", time: "Oct 24, 2023", amount: "-$85.00" },
]

export default function Transactions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
        <button className="text-sm text-emerald-600">View All</button>
      </div>

      <div className="space-y-4">
        {transactions.map((t, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">{t.label}</p>
              <p className="text-xs text-gray-400">{t.time}</p>
            </div>
            <span
              className={`text-sm font-medium ${
                t.positive ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {t.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}