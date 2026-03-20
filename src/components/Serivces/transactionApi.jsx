import { fetchWithAuth } from "@/lib/api";


const BASE_URL = `${import.meta.env.VITE_API_URL}/api/transactions`;

export async function getTransactions({ page, limit, type, search }) {
    const params = new URLSearchParams({page, limit, type, search});
    
    if (type && type !== 'all') { 
        params.append('type', type.toLowerCase());
    }
    const res = await fetchWithAuth(`${BASE_URL}?${params}`);

    if (!res.ok) {
        throw new Error('Failed to fetch transactions');
    }

    return res.json(); 
}