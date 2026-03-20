import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getTransactions } from "../Serivces/transactionApi";
import { fetchWithAuth } from "@/lib/api";

export function useTransactions({ page = 1, limit = 10, type = 'all', search="" }) {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ["transactions", page, limit, type, search],
        queryFn: () => getTransactions({ page, limit, type, search }),
        keepPreviousData: true,
        staleTime: 30 * 1000,
    });
    const deleteTransactionMutation = useMutation({
        mutationFn: (id) => fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/transactions/${id}`, {method: "DELETE",}),
    
    onSuccess: () => {
        queryClient.invalidateQueries( ["transactions", page, limit, type, search])
        queryClient.invalidateQueries(["analytics"]);
    },
    });
    return {
        transactions: query.data?.transactions || [],
        isLoading: query.isLoading,
        isError: query.isError,
        totalPages: query.data?.totalPages || 1,
        total: query.data?.total || 0,

        deleteTransaction: deleteTransactionMutation.mutate,
        isDeleting: deleteTransactionMutation.isPending
    }
}