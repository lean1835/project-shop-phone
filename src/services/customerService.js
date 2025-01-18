import axios from 'axios';

let url = 'http://localhost:8080/customers';

export async function getAllCustomers() {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function addNewCustomer(customer) {
    try {
        const response = await axios.post(url, customer);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}