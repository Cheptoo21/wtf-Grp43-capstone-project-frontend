import { useEffect, useState } from "react"
import StatCard from "@/components/dashboard/statscard"
import VoiceAssistant from "@/components/dashboard/voiceassistant"
import Transactions from "@/components/dashboard/recenttransactions"
import SummaryCard from "@/components/dashboard/summarycard"
import { fetchWithAuth } from "@/lib/api"
import { getToken } from "@/lib/authService"

export default function Dashboard() {
  const [summary, setSummary] = useState([])
  const [loading, setLoading] = useState(true)
   const [savedTransaction, setSavedTransaction] = useState(null);

    useEffect(() => {
      async function fetchTransactions() {
        try {
          const res = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/api/transactions/summary`,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          )
  
          if (!res.ok) throw new Error("Failed to fetch")
  
          const data = await res.json()
          setSummary(data.data || [])
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchTransactions()
    }, [savedTransaction])
  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      
      {loading && (
        <div className="text-center py-20">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      ) }
      {!loading && (
        <>
        <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 lg:col-span-5">
          <StatCard todayProfit={summary.todayProfit || "0.00"} profitChange={summary.profitChange  || "0.00"} currency={summary.currency || "USD"} />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <VoiceAssistant setSaved={setSavedTransaction} saved={savedTransaction}/>
        </div>
      </div>

     
      <div className="grid grid-cols-12 gap-6">
        
       
        <div className="col-span-12 lg:col-span-8">
          <Transactions saved={savedTransaction}/>
        </div>

      
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SummaryCard
            title="Monthly Revenue"
            amount={summary.monthlyRevenue ? `${summary.currency} ${summary.monthlyRevenue}` : `${summary.currency} 0.00`}
          />
          <SummaryCard
            title="Top Product"
            amount={summary.topSellingItem ? ` ${summary.topSellingItem}` : "Nil"}
          />
        </div>

      </div>
      </>)}
    </div>
  )
}