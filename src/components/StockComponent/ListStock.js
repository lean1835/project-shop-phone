import React, { useEffect, useState } from "react";
import { getAllStock } from "../../service/stockService";
function ListStock() {
  const [productList, setProductList] = useState([]);
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
  return (
    <>
      <div style={{ padding: "20px" }}>
        <h3>Quản lý nhập kho</h3>
        <div>
          <input type="text" placeholder="Tìm kiếm " />
          <button>Tìm kiếm</button>
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
            Nhập sản phẩm
          </button>

          <button className="btn btn-secondary">Thoát</button>
        </div>
      </div>
    </>
  );
}
export default ListStock;
