import { useState } from "react";
import { useTransactions } from "../hooks/useTransaction";

const FILTERS = ["All", "Income", "Expenses", "Sales"];
const TABLE_HEADERS = ["DATE", "DESCRIPTION", "CATEGORY", "TYPE", "AMOUNT", "STATUS"];
const PER_PAGE = 5;

function getCategoryFromItem(item) {
  const lower = item.toLowerCase();
  if (lower.includes("rent")) return { label: "Rent", emoji: "🏢" };
  if (lower.includes("workshop") || lower.includes("education")) return { label: "Education", emoji: "📚" };
  if (lower.includes("ad") || lower.includes("marketing") || lower.includes("campaign")) return { label: "Marketing", emoji: "📣" };
  if (lower.includes("fabric") || lower.includes("supplies") || lower.includes("rice") || lower.includes("bulk")) return { label: "Supplies", emoji: "🧵" };
  if (lower.includes("dress") || lower.includes("order") || lower.includes("sale")) return { label: "Sales", emoji: "🛍️" };
  if (lower.includes("bean") || lower.includes("food")) return { label: "Food", emoji: "🌾" };
  return { label: "General", emoji: "📋" };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function formatAmount(amount, type) {
  const sign = type === "sale" ? "+" : "-";
  const value = (amount / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  });
  return `${sign}$${value}`;
}


function DesktopRow({ t }) {
  const cat = getCategoryFromItem(t.item);
  const isCredit = t.transactionType === "sale";

  return (
    <div
      className="hidden md:grid items-center px-5 py-4 border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
      style={{ gridTemplateColumns: "110px 1fr 130px 80px 110px 120px" }}
    >
      <span className="text-xs text-gray-500">{formatDate(t.date)}</span>

      <div className="min-w-0 pr-4">
        <p className="text-sm font-semibold text-gray-800 truncate">{t.item}</p>
        {t.vendor && <p className="text-xs text-gray-400 mt-0.5 truncate">{t.vendor}</p>}
      </div>

      <div className="flex items-center gap-2">
        <span className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 text-sm shrink-0">
          {cat.emoji}
        </span>
        <span className="text-xs text-gray-600">{cat.label}</span>
      </div>

      <span
        className="inline-block px-2.5 py-1 rounded text-xs font-bold tracking-wide w-fit"
        style={{
          color: isCredit ? "#16a34a" : "#dc2626",
          background: isCredit ? "#dcfce7" : "#fee2e2",
        }}
      >
        {isCredit ? "CREDIT" : "DEBIT"}
      </span>

      <span className="text-sm font-bold" style={{ color: isCredit ? "#16a34a" : "#dc2626" }}>
        {formatAmount(t.amount, t.transactionType)}
      </span>

      <span
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border w-fit"
        style={{
          color: isCredit ? "#16a34a" : "#f97316",
          background: isCredit ? "#dcfce7" : "#ffedd5",
          borderColor: isCredit ? "#16a34a30" : "#f9731630",
        }}
      >
        <span className="text-[10px]">✓</span> Completed
      </span>
    </div>
  );
}

function MobileCard({ t }) {
  const cat = getCategoryFromItem(t.item);
  const isCredit = t.transactionType === "sale";

  return (
    <div className="md:hidden flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
      <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-base shrink-0">
        {cat.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{t.item}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {t.vendor || cat.label} · {formatDate(t.date)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-sm font-bold" style={{ color: isCredit ? "#16a34a" : "#dc2626" }}>
          {formatAmount(t.amount, t.transactionType)}
        </span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wide"
          style={{
            color: isCredit ? "#16a34a" : "#dc2626",
            background: isCredit ? "#dcfce7" : "#fee2e2",
          }}
        >
          {isCredit ? "CREDIT" : "DEBIT"}
        </span>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, total, onPageChange }) {
  const start = Math.min((page - 1) * PER_PAGE + 1, total);
  const end = Math.min(page * PER_PAGE, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-gray-100">
      <span className="text-xs text-gray-500">
        Showing {start}–{end} of {total} transactions
      </span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 rounded-lg border text-xs font-medium transition-colors ${
              page === p
                ? "bg-gray-900 text-white border-transparent"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}


export default function LedgerTransaction() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { transactions, isLoading } = useTransactions();

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.item.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "Income" && t.transactionType === "sale") ||
      (filter === "Expenses" && t.transactionType === "expense") ||
      (filter === "Sales" && t.transactionType === "sale");
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f) => { setFilter(f); setPage(1); };
  const handleSearch = (s) => { setSearch(s); setPage(1); };

  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-0">
          <span className="text-gray-400 text-sm shrink-0">🔍</span>
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search transactions..."
            className="border-none outline-none text-sm text-gray-700 bg-transparent w-full"
          />
          <span className="text-gray-400 text-base shrink-0">
            <span className="shrink-0">
  <img
    src="/src/assets/icons/mic.svg"
    alt="mic"
    className="w-4 h-4 text-gray-400"
  />
</span>
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 shrink-0">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-150 ${
                filter === f
                  ? "bg-gray-900 text-white border-transparent"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
       
        <div
          className="hidden md:grid px-5 py-3 bg-gray-50/80 border-b border-gray-100"
          style={{ gridTemplateColumns: "110px 1fr 130px 80px 110px 120px" }}
        >
          {TABLE_HEADERS.map((h) => (
            <span key={h} className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
              {h}
            </span>
          ))}
        </div>

       
        <div className="md:hidden px-4 py-3 bg-gray-50/80 border-b border-gray-100">
          <span className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
            Transactions
          </span>
        </div>

        
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-40 text-sm text-gray-400">
              Loading transactions...
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-sm text-gray-400">
              No transactions found.
            </div>
          ) : (
            paginated.map((t) => (
              <div key={t._id}>
                <DesktopRow t={t} />
                <MobileCard t={t} />
              </div>
            ))
          )}
        </div>

       
        <Pagination
          page={page}
          totalPages={totalPages}
          total={filtered.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}