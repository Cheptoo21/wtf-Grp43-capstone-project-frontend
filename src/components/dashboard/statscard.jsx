import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function StatCard({ todayProfit, profitChange, currency }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">Today's Profit</p>
      <h2 className="text-3xl font-semibold text-emerald-500 mt-2">
        {`${currency} ${todayProfit}`}
      </h2>
      <p className={`text-sm mt-2 flex items-center ${profitChange >= 0 ? "text-emerald-500 ": "text-red-500"}`}>
        {profitChange >= 0 ? <ArrowUpRight color='#10B981' size={16}/> : <ArrowDownLeft color='red' size={16}/>} {profitChange}% from yesterday
      </p>
    </div>
  )
}