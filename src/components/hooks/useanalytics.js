import { useQuery } from "@tanstack/react-query";

const FALLBACK_ANALYTICS = {
  topSellingItems: [
    { item: "beans", count: 12 },
    { item: "rice", count: 9 },
    { item: "sugar", count: 6 },
    { item: "yam", count: 5 },
  ],
  topExpenses: [
    { item: "transport", count: 7 },
    { item: "rice", count: 5 },
    { item: "rent", count: 3 },
    { item: "packaging", count: 2 },
  ],
  transactionsByDayOfWeek: {
    Monday: 18,
    Tuesday: 22,
    Wednesday: 15,
    Thursday: 20,
    Friday: 30,
    Saturday: 25,
    Sunday: 10,
  },
  topItemByDayOfWeek: {
    Monday: { item: "beans", count: 4 },
    Tuesday: { item: "rice", count: 6 },
    Wednesday: null,
    Thursday: { item: "sugar", count: 3 },
    Friday: { item: "beans", count: 8 },
    Saturday: { item: "yam", count: 5 },
    Sunday: null,
  },
  monthlyBreakdown: {
    "Jan 2026": { sales: 12000, expenses: 5000, profit: 7000 },
    "Feb 2026": { sales: 13000, expenses: 5000, profit: 8000 },
  },
};

export function useAnalytics() {
  const query = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await fetch("/api/transactions/analytics", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const data = await res.json();
      if (!data?.analytics) return null;
      return data;
    },
    retry: 1,
    staleTime: 60_000,
  });

  const analytics = query.data?.analytics ?? FALLBACK_ANALYTICS;

  return {
    analytics,
    isLoading: query.isLoading,
    isError: query.isError,
    isDemo: !query.data?.analytics,
  };
}