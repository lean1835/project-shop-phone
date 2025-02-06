import React, { useEffect, useRef, useState } from "react";
import { getAllStock, searchStockByName } from "../../services/stockService";
import { Link } from "react-router-dom";

function ListStock() {
  const [productList, setProductList] = useState([]);
  const searchName = useRef('');
  const searchDateRef = useRef();
  const [page, setPage] = useState(1);
  const [size] = useState(2);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, totalRecord } = await getAllStock(page, size);
        setProductList(data);
        setTotalPage(Math.ceil(totalRecord / size));
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } 
    };
    fetchData();
  }, [page, size]);

  const handleSearch = async () => {
    const name = searchName.current.value;
    const importDate = searchDateRef.current.value;

    try {
      const searchList = await searchStockByName(name, importDate);
      setProductList(searchList);
      setTotalPage(1); // Reset to 1 page when searching
    } catch (error) {
      console.error("Error searching stocks:", error);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(prev => prev + 1);
    }
  };

  const handlePre = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h4 style={{ textAlign: "center" }}>QUẢN LÝ NHẬP KHO</h4>
        <div className="search-container" style={{ marginTop: "20px", marginLeft: "20px" }}>
          <select className="form-select d-inline-block w-auto" ref={searchDateRef}>
            <option value="">Tìm kiếm theo ngày</option>
            {productList.map(e => (
              <option key={e.id} value={e.importDate}>
                {e.importDate}
              </option>
            ))}
          </select>
          <input
            ref={searchName}
            placeholder="Sản phẩm cần tìm kiếm"
            className="form-control d-inline-block w-25"
          />
          <button className="btn btn-sm btn-success ms-2" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>STT</th>
              <th>Ngày</th>
              <th>Tên hàng</th>
              <th>Tên nhà cung cấp</th>
              <th>Số lượng nhập</th>
              <th>Đơn giá</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 ? (
              productList.map((e, i) => (
                <tr key={e.id}>
                  <td>{(page - 1) * size + (i + 1)}</td>
                  <td>{e.importDate}</td>
                  <td>{e.product ? e.product.name : "N/A"}</td>
                  <td>{e.supplier ? e.supplier.name : "N/A"}</td>
                  <td>{e.quantity}</td>
                  <td>{e.importPrice}</td>
                  <td>
                    <button className="btn btn-warning btn-sm">Sửa</button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm">Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Không tìm thấy kết quả nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
          <button className="btn btn-sm btn-secondary" onClick={handlePre}>
          &lt;&lt;
          </button>
          {[...Array(totalPage)].map((_, i) => (
            <button
              className={`page-item ${page === i + 1 ? "active" : ""}`}
              key={i}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button className="btn btn-sm btn-secondary" onClick={handleNext}>
          &gt;&gt;
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link className="btn btn-success" style={{ color: "white", textDecoration: "none" }} to={"/ImportStock"}>
            Nhập kho
          </Link>
          <button className="btn btn-secondary">Thoát</button>
        </div>
      </div>
    </>
  );
}

export default ListStock;