
import axios from "axios";

const BASE_URL = "http://localhost:9001/api/v1/transaction-ms/transactions";


export const getAllTransactions = async () => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        const response = await axios.get(`${BASE_URL}/allTransactions`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};
