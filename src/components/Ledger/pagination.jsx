export function Pagination({ page, totalPages, total, onPageChange }) {
    const PER_PAGE = 10
    const start = Math.min((page - 1) * PER_PAGE + 1, total);
    const end = Math.min(page * PER_PAGE, total);
    console.log(totalPages);
  
    return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-gray-100">
      <span className="text-xs text-gray-500">
        Showing {start}–{end} of {total} transactions
      </span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
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
          onClick={() => onPageChange((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
