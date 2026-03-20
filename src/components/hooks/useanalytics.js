import { fetchWithAuth } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useAnalytics() {
  const query = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/transactions/analytics`);
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const data = await res.json();
      return data;
    },
    retry: 1,
    staleTime: 30 * 1000,
  });


  return {
    analytics: query.data?.analytics || [],
    isLoading: query.isLoading,
    isError: query.isError,
    isDemo: !query.data?.analytics,
  };
}