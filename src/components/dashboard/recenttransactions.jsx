import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getToken } from "@/lib/authService"
import { formatRelativeDate } from "@/utils/formatDate"
import { fetchWithAuth } from "@/lib/api"

export default function Transactions({ saved }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetchWithAuth(
          `${import.meta.env.VITE_API_URL}/api/transactions?limit=10`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        )

        if (!res.ok) throw new Error("Failed to fetch")

        const data = await res.json()
        setTransactions(data.transactions || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [saved])

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
        <button
          onClick={() => navigate("/ledger")}
          className="text-sm text-emerald-600"
        >
          See more
        </button>
      </div>

      <div className="space-y-4">
        {loading && (
          <p className="text-sm text-gray-500 text-center">Loading...</p>
        )}


        <div className="space-y-4">
       {!transactions.length ? (
          <p className="text-sm text-gray-500 text-center">No transactions yet.</p>
        ) : transactions.map((t, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700 capitalize">{`${t.transactionType}: ${t.item}`}</p>
              <p className="text-xs text-gray-400">{formatRelativeDate(t.date)}</p>
            </div>
            <span
              className={`text-sm font-medium ${
                t.transactionType === "sale" ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {`${t.currency} ${t.amount}`}
            </span>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}