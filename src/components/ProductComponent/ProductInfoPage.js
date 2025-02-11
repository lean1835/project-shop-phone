import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const productsData = [
  { id: 1, name: "Nokia G10 4GB-64GB", price: "3.190.000", cpu: "SCT310", storage: "64 GB", quantity: 100 },
  { id: 2, name: "Xiaomi 12 Pro 12GB - 256GB", price: "25.790.000", cpu: "Snapdragon 8 Gen 1", storage: "256 GB", quantity: 50 },
  { id: 3, name: "Samsung Galaxy Z Flip3 5G 12GB", price: "18.990.000", cpu: "Snapdragon 888", storage: "128 GB", quantity: 40 },
  { id: 4, name: "iPhone SE 2022 64GB", price: "11.990.000", cpu: "Apple A15 Bionic", storage: "64 GB", quantity: 20 },
  { id: 5, name: "iPhone 13 mini 128GB", price: "18.490.000", cpu: "Apple A15 Bionic", storage: "128 GB", quantity: 25 },
  { id: 6, name: "iPhone 13 mini 128GB", price: "18.490.000", cpu: "Apple A15 Bionic", storage: "128 GB", quantity: 25 },
  { id: 7, name: "iPhone 13 mini 128GB", price: "18.490.000", cpu: "Apple A15 Bionic", storage: "128 GB", quantity: 25 }
];

const ProductInfoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(productsData);
  const itemsPerPage = 5;

  const filteredProducts = products.filter(product =>
    product[searchCategory].toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (id) => {
    const newName = prompt("Nhập tên mới:", products.find(p => p.id === id).name);
    if (newName) {
      setProducts(products.map(product => product.id === id ? { ...product, name: newName } : product));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => window.location.href = '/add-product'}>Thêm mới hàng hóa</button>
        <div className="d-flex gap-2">
          <select className="form-select" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
            <option value="name">Tên</option>
            <option value="price">Giá</option>
            <option value="quantity">Số lượng</option>
          </select>
          <input type="text" className="form-control" placeholder={`Tìm kiếm theo ${searchCategory}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>CPU</th>
            <th>Lưu trữ</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.cpu}</td>
              <td>{product.storage}</td>
              <td>{product.quantity}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(product.id)}>Chỉnh sửa</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Trước</button>
          </li>
          {[...Array(totalPages).keys()].map(number => (
            <li key={number} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(number + 1)}>{number + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Sau</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductInfoPage;
