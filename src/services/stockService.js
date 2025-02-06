import axios from "axios";
let url = `http://localhost:8080/stock?_expand=product&_expand=supplier`;
export async function getAllStock(page, size) {
  try{
      const response = await axios.get(`${url}&_sort=name&_order=asc&_page=${page}&_limit=${size}`);
      console.log(response); 
      const data = response.data;
      const totalRecord = response.headers['x-total-count']
      return {
          data: data, 
          totalRecord: totalRecord
      };
  }catch(e){
      console.log("Lỗi"+e);
  }
  }

export async function searchStockByName(searchName, importDate) {
  let params = [];

  if (searchName) {
    params.push(`product.name_like=${searchName}`); 
  }
  
  if (importDate) {
    params.push(`importDate=${importDate}`);
  }

  const searchUrl = params.length > 0 ? `${url}&${params.join('&')}` : url;

  try {
    const response = await axios.get(searchUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

