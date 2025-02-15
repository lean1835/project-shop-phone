import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css";
import AddProductModal from "./AddProductModal";
import EditProduct from "./EditProduct";
import "./ProductInfoPage.css";

const ProductInfoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const itemsPerPage = 5;

  
  const API_URL = "http://localhost:8080/products";

  // DS sản phẩm từ API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
    }
  };

  // thêm sản phẩm từ AddProductModal
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowModal(false);
  };

  // chỉnh sửa SP
  const handleEditProduct = (id) => {
    setEditProductId(id);
    setEditModal(true);
  };

  // UPdate DS sau khi chỉnh
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // xoá 1
  const handleDeleteSingleProduct = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // xoá nhiều
  const handleDeleteSelectedProducts = async () => {
    if (selectedProducts.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để xóa.");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn không?")) return;

    try {
      await Promise.all(selectedProducts.map((id) => axios.delete(`${API_URL}/${id}`)));

      setProducts((prevProducts) =>
        prevProducts.filter((product) => !selectedProducts.includes(product.id))
      );
      setSelectedProducts([]);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // chọn ô
  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // lọc SP
  const filteredProducts = products.filter((product) =>
    product[searchCategory]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary text-white" onClick={() => setShowModal(true)}>
            Thêm mới hàng hóa
          </button>

          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="name">Tên</option>
              <option value="price">Giá</option>
              <option value="storage">Lưu trữ</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder={searchCategory}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button className="btn btn-success" onClick={() => setSearchTerm("")}>
                Thoát
              </button>
            )}
          </div>
        </div>

        <AddProductModal show={showModal} onClose={() => setShowModal(false)} onAdd={handleAddProduct} />
        <EditProduct show={editModal} onClose={() => setEditModal(false)} productId={editProductId} onUpdate={handleUpdateProduct} />

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Chọn</th>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>CPU</th>
              <th>Lưu trữ</th>
              <th>Màn hình</th>
              <th>Camera</th>
              <th>Selfie</th>
              <th>Mô tả</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td>{indexOfFirstItem + index + 1}</td>
                <td><img src={product.image} alt={product.name} width="50" /></td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.cpu}</td>
                <td>{product.storage}</td>
                <td>{product.screen_size}</td>
                <td>{product.camera}</td>
                <td>{product.selfie}</td>
                <td>{product.description}</td>
                <td className="w-10">
                  <button className="btn btn-success text-white p-2 " onClick={() => handleEditProduct(product.id)}>
                    Sửa
                  </button>
                  <button className="btn btn-danger text-white p-2 m-2" onClick={() => handleDeleteSingleProduct(product.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Trước
              </button>
            </li>
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(number + 1)}>
                  {number + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Sau
              </button>
            </li>
            <li className="ms-auto">
              <button className="btn btn-danger text-white" onClick={handleDeleteSelectedProducts}>
                Chọn và xoá nhiều SP
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProductInfoPage;
