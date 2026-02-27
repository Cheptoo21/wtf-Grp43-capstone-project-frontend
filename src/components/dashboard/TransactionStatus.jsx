import { CheckCircle } from "lucide-react"

export default function TransactionStatus({ transaction }) {
  if (!transaction) return null

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <CheckCircle className="w-8 h-8 text-green-500 animate-bounce" />
      <p className="text-green-600 font-semibold">Transaction Recorded!</p>
      <p className="text-white">
        {transaction.item} — {transaction.amount} NGN
      </p>
    </div>
  )
}