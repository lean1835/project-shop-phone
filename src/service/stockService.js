import axios from "axios";
let url = `http://localhost:8080/stock?_expand=product&_expand=supplier`;
export async function getAllStock() {
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log("Lỗi" + e);
  }
}
export async function searchStockByName(searchName, productId) {
  let url1 = `${url}`;
  if (productId === "") {
    url1 = `${url}?name_like=${searchName}&_sort=name&_order=asc`;
  }
  try {
    const response = await axios.get(url1);
    return response.data;
  } catch (e) {
    console.log("Lỗi" + e);
    return null;
  }
}

