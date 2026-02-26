
export default function StatCard() {
  return (
    <div className="bg-white rounded-xl p-12 shadow-sm">
      <p className="text-sm text-gray-500">Today's Profit</p>
      <h2 className="text-3xl font-semibold text-emerald-500 mt-2">
        $1,245.00
      </h2>
      <p className="text-sm text-emerald-500 mt-1">
        +12.5% from yesterday
      </p>
    </div>
  )
}