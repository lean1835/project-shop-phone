import axios from 'axios';
let urlSuppliers = 'http://localhost:8080/suppliers';

export async function getAllSuppliers(){
    try {
        const response = await axios.get(urlSuppliers);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function searchSuppliersByName(searchName){
    try {
        const response = await axios.get(`${urlSuppliers}?name_like=${searchName}`);
        return response.data;
    }catch (error){
        console.error(error);
    }
}