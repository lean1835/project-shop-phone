import axios from 'axios';

const API_URL = 'http://localhost:3000/'; 
const DATA_URL = '/data/SupplierData.json';  

export const getSuppliers = async (page, limit) => {
    try {
        const response = await axios.get(`${API_URL}/suppliers`, { params: { page, limit } });
        return response.data;
    } catch (error) {
    console.error('Lỗi khi gọi API backend:', error);
    throw error;
    }
};

export const getSuppliersFromJson = async () => {
    try {
    const response = await fetch(DATA_URL);  
    const data = await response.json();  
    return data;  
} catch (error) {
    console.error('Lỗi khi đọc dữ liệu từ file JSON:', error);
    throw error;
}
};

export const addSupplier = async (supplier) => {
    const response = await axios.post(`${API_URL}/suppliers`, supplier);
    return response.data;
};

export const updateSupplier = async (id, supplier) => {
    const response = await axios.put(`${API_URL}/suppliers/${id}`, supplier);
    return response.data;
};
