import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

const LedgerHeader = ({ handleFilter, type, handleSearch, initialSearch="" }) => {
    const FILTERS = ["All", "Expense", "Sale"];
    const TABLE_HEADERS = ["DATE", "DESCRIPTION", "CATEGORY", "TYPE", "AMOUNT", "STATUS"];
    const [searchWord, setSearchWord ] = useState(initialSearch);

    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch(searchWord)
        }, 1000)

        return () => clearTimeout(handler);
    }, [searchWord])

  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4 p-4">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-0">
          <span className="text-gray-400 text-sm shrink-0">🔍</span>
          <input
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Search transactions..."
            className="border-none outline-none text-sm text-gray-700 bg-transparent w-full"
          />
          <span className="text-gray-400 text-base shrink-0">
            <span className="shrink-0">
</span>
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 shrink-0">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-150 ${
                type.toLowerCase() === f.toLowerCase()
                  ? "bg-gray-900 text-white border-transparent"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div> 
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
    </div>
    
  )
}
 
export default LedgerHeader;