
import StatCard from "@/components/dashboard/statscard"
import VoiceAssistant from "@/components/dashboard/voiceassistant"
import Transactions from "@/components/dashboard/recenttransactions"
import SummaryCard from "@/components/dashboard/summarycard"

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      
     
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 lg:col-span-5">
          <StatCard />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <VoiceAssistant />
        </div>
      </div>

     
      <div className="grid grid-cols-12 gap-6">
        
       
        <div className="col-span-12 lg:col-span-8">
          <Transactions />
        </div>

      
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SummaryCard
            title="Monthly Revenue"
            amount="$14,280"
            subtitle="75% of monthly goal reached"
          />
          <SummaryCard
            title="Pending Expenses"
            amount="$420.00"
            action="Review 3 Invoices"
          />
        </div>

      </div>
    </div>
  )
}