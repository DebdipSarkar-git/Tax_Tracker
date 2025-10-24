import axios from "axios";
import { AddTransactions } from "../models/AddTransactions";

const BASE_URL = "http://localhost:9001/api/v1/transaction-ms/transactions";
const FILE_UPLOAD_URL = "http://localhost:9001/api/v1/document-ms";
const FORM_SUBMIT_URL = "http://localhost:9001/api/v1/form-ms";

export const saveAllTransactions = async (payload:AddTransactions[]) => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        const response = await axios.post(`${BASE_URL}/addTransactions`, payload, {
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

export const uploadFile = async (payload:FormData) => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        const response = await axios.post(`${FILE_UPLOAD_URL}/upload`, payload, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': `multipart/form-data`
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

export const downloadFile = async (id:number|null) => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        const response = await axios.get(`${FILE_UPLOAD_URL}/files/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            responseType: 'blob'
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

export const getFileDetails = async() => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        const response = await axios.get(`${FILE_UPLOAD_URL}/files`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

export const submitFormDetails = async() => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        const response = await axios.post(`${FORM_SUBMIT_URL}/form-status`,{}, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

export const fetchFormDetails = async() => {
    try {
        const authToken = sessionStorage.getItem('authToken');
        const response = await axios.get(`${FORM_SUBMIT_URL}/form-status`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};




