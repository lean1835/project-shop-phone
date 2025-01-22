import axios from "axios"

let url = `http://localhost:8080/stock`

export async function getAllStock() {
    try {
        const response = await axios.get(`${url}?_expand=product&_expand=supplier`);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi" + e);
    }
}

