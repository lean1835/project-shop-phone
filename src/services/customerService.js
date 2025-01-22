import axios from 'axios';

let urlCus = 'http://localhost:8080/customers';

export async function getAllCustomers() {
    try {
        const response = await axios.get(urlCus);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function addNewCustomer(customer) {
    try {
        const response = await axios.post(urlCus, customer);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}