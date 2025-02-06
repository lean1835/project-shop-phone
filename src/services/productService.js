import axios from 'axios';
let urlProduct = 'http://localhost:8080/products';

export async function getAllProducts(){
    try {
        const response = await axios.get(urlProduct);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function searchProductByName(searchName){
    try {
        const response = await axios.get(`${urlProduct}?name_like=${searchName}`);
        return response.data;
    }catch (error){
        console.error(error);
    }
}