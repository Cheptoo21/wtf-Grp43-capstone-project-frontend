import { useState } from "react";
import { useTransactions } from "../hooks/useTransaction";

import LedgerRow from "./ledgerRow";
import { Pagination } from "./pagination";
import LedgerHeader from "./ledgerheader";

const LedgerTransaction = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  
  const { transactions, totalPages, isLoading, total, deleteTransaction, isDeleting } = useTransactions(
          { page, limit: 10, type, search}
        );

  const handleFilter = (f) => {
    setType(f.toLowerCase());
    setPage(1);
   
  }

  const handleSearch = (s) => { 
    setSearch(s); 
    setPage(1); 
  };
        
  return ( 
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
      <LedgerHeader type={type} handleFilter={handleFilter} handleSearch={handleSearch} initialSearch={search}/>
      {isLoading ? <p className="text-sm text-gray-500 text-center py-20">Loading transactions...</p> : transactions.length === 0 ? <p className="text-sm text-gray-500 text-center py-50">No transactions yet.</p> : isDeleting ? <p className="text-sm text-gray-500 text-center py-50">Deleting...</p> : <LedgerRow transactions={transactions} deleteTransaction={deleteTransaction} /> }

      <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage}/>
    </div>
   );
}
 
export default LedgerTransaction;