import React, { useEffect, useRef, useState } from "react";
import { getAllStock, searchStockByName } from "../../service/stockService";
function ListStock() {
  const [productList, setProductList] = useState([]);
  const searchRef = useRef();
  const searchProductIdRef = useRef();
  const searchDateIdRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getAllStock();
        setProductList(list);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    let importDate = searchRef.current.value;
    let productId = searchProductIdRef.current.value;
    const fetData = async () => {
      const searchList = await searchStockByName(importDate, productId);
      setProductList(searchList);
    };
    fetData();
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <h4 style={{ textAlign: "center" }}>QUẢN LÝ NHẬP KHO</h4>
        <div
          className="search-container"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          <select
            className="form-select d-inline-block w-auto"
            ref={searchDateIdRef}
          >
            <option value="">Tìm kiếm theo ngày</option>
            {productList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.importDate}
              </option>
            ))}
          </select>
          <select
            className="form-select d-inline-block w-auto"
            ref={searchProductIdRef}
          >
            <option value="">Chọn sản phẩm cần tìm kiếm</option>
            {productList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.product.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-sm btn-success ms-2"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>STT</th>
              <th>Ngày</th>
              <th>Tên hàng</th>
              <th>Tên nhà cung cấp</th>
              <th>Số lượng nhập</th>
              <th>Đơn giá</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {productList &&
              productList.map((e, i) => (
                <tr key={i.id}>
                  <td>{i + 1}</td>
                  <td>{e.importDate}</td>
                  <td>{e.product.name}</td>
                  <td>{e.supplier.name}</td>
                  <td>{e.quantity}</td>
                  <td>{e.importPrice}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: "10px" }}
                    >
                      Xóa
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ marginRight: "10px" }}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div style={{ marginTop: "20px" }}>
          <button className="btn btn-success" style={{ marginRight: "10px" }}>
            Nhập kho
          </button>

          <button className="btn btn-secondary">Thoát</button>
        </div>
      </div>
    </>
  );
}
export default ListStock;
