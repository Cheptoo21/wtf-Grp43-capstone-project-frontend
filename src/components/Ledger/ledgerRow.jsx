import { formatRelativeDate } from "@/utils/formatDate";
import { Trash2 } from "lucide-react";

const LedgerRow = ({ transactions, deleteTransaction }) => {
    function getCategoryFromItem(item) {
      const lower = item.toLowerCase();
        let emoji;
        lower.includes("sale") ? emoji = "💰" :  emoji = "🛍️";
        return emoji;
    }
    return ( 
        <>
            {transactions.map(t => (
                <>
                    <div key={t.id} className="hidden lg:grid items-center px-5 py-4 border-b border-gray-50 hover:bg-gray-50/60 transition-colors" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 50px" }}>
                        <span className="text-xs text-gray-500">{formatRelativeDate(t.date)}</span>

                        <div className="min-w-0 pr-4">
                            <p className="text-sm font-semibold text-gray-800 truncate">{t.item.toUpperCase()}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 text-sm shrink-0">
                            {getCategoryFromItem(t.transactionType)}
                            </span>
                            <span className="text-xs text-gray-600">{t.transactionType}</span>
                        </div> 

                        <span
                            className="inline-block px-2.5 py-1 rounded text-xs font-bold tracking-wide w-fit"
                            style={{
                            color: t.transactionType == "sale" ? "#16a34a" : "#dc2626",
                            background: t.transactionType == "sale" ? "#dcfce7" : "#fee2e2",
                            }}
                        >
                            {t.transactionType == "sale" ? "CREDIT" : "DEBIT"}
                        </span>

                        <span className="text-sm font-bold" style={{ color: t.transactionType == "sale"? "#16a34a" : "#dc2626" }}>
                            {`${t.currency} ${t.amount}`}
                        </span>

                        <span
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border w-fit"
                            style={{
                            color: t.transactionType == "sale" ? "#16a34a" : "#f97316",
                            borderColor: t.transactionType == "sale" ? "#16a34a30" : "#f9731630",
                            }}
                        >
                            <span className="text-[10px]" onClick={() => deleteTransaction(t._id)}><Trash2 /></span></span>
                    </div>

                    <div className="lg:hidden flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{t.item.toUpperCase()}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                            {formatRelativeDate(t.date)}
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-sm font-bold" style={{ color: t.transactionType == "sale" ? "#16a34a" : "#dc2626" }}>
                            {`${t.currency} ${t.amount}`}
                            </span>
                        <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wide"
                            style={{
                                color: t.transactionType == "sale" ?"#16a34a" : "#dc2626",
                                background: t.transactionType == "sale" ? "#dcfce7" : "#fee2e2",
                            }}
                            >
                            {t.transactionType == "sale" ? "CREDIT" : "DEBIT"}
                            </span>
                        </div>

                        <span
                            className="inline-flex items-center gap-1 px-3 py-1 border-0 text-xs font-medium border w-fit"
                            style={{
                            color: t.transactionType == "sale" ? "#16a34a" : "#f97316",
                            }}
                        >
                            <span className="text-[10px]"><Trash2 size={16}/></span></span>
                    </div>
                </>
            ))}
    </>)
}
 
export default LedgerRow;