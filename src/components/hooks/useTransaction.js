import { useQuery } from "@tanstack/react-query";

const FALLBACK_TRANSACTIONS = [
  {
    _id: "685a3f2c1d4e8b0012abc001",
    transactionType: "expense",
    item: "Bulk Fabric Purchase",
    vendor: "Indigo Linens Co.",
    amount: 124000,
    date: "2024-05-24T10:00:00.000Z",
  },
  {
    _id: "685a3f2c1d4e8b0012abc002",
    transactionType: "sale",
    item: "Custom Dress Order #442",
    vendor: "Sarah Jenkins",
    amount: 45000,
    date: "2024-05-23T09:00:00.000Z",
  },
  {
    _id: "685a3f2c1d4e8b0012abc003",
    transactionType: "expense",
    item: "Studio Rent - May",
    vendor: "Cape Properties Ltd.",
    amount: 210000,
    date: "2024-05-22T08:00:00.000Z",
  },
  {
    _id: "685a3f2c1d4e8b0012abc004",
    transactionType: "sale",
    item: "Online Workshop: African Prints",
    vendor: "12 Attendees",
    amount: 60000,
    date: "2024-05-21T14:00:00.000Z",
  },
  {
    _id: "685a3f2c1d4e8b0012abc005",
    transactionType: "expense",
    item: "Social Media Ad Campaign",
    vendor: "Meta Ads Manager",
    amount: 15000,
    date: "2024-05-20T11:00:00.000Z",
  },
  {
    _id: "685a3f2c1d4e8b0012abc006",
    transactionType: "sale",
    item: "Beans",
    vendor: "Market Sale",
    amount: 5000,
    date: "2026-02-26T10:00:00.000Z",
  },
  {
    _id: "685a3f2c1d4e8b0012abc007",
    transactionType: "expense",
    item: "Rice Supplies",
    vendor: "Wholesale Depot",
    amount: 1500,
    date: "2026-02-25T08:30:00.000Z",
  },
];

export function useTransactions() {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      if (!data?.transactions?.length) return null;
      return data;
    },
    retry: 1,
    staleTime: 30_000,
  });

  const transactions =
    query.data?.transactions?.length
      ? query.data.transactions
      : FALLBACK_TRANSACTIONS;

  return {
    transactions,
    isLoading: query.isLoading,
    isError: query.isError,
    isDemo: !query.data?.transactions?.length,
  };
}