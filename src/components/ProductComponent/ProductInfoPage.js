import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/Card";
import { Table } from "./ui/Table";
import { Pagination } from "./ui/Pagination";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import  Select  from "./ui/Select";

const productsData = [
  { id: 1, name: "Nokia G10 4GB-64GB", price: "3.190.000", cpu: "SCT310", storage: "64 GB", quantity: 100 },
  { id: 2, name: "Xiaomi 12 Pro 12GB - 256GB", price: "25.790.000", cpu: "Snapdragon 8 Gen 1", storage: "256 GB", quantity: 50 },
  { id: 3, name: "Samsung Galaxy Z Flip3 5G 12GB", price: "18.990.000", cpu: "Snapdragon 888", storage: "128 GB", quantity: 40 },
  { id: 4, name: "iPhone SE 2022 64GB", price: "11.990.000", cpu: "Apple A15 Bionic", storage: "64 GB", quantity: 20 },
  { id: 5, name: "iPhone 13 mini 128GB", price: "18.490.000", cpu: "Apple A15 Bionic", storage: "128 GB", quantity: 25 }
];

const ProductInfoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(productsData);
  const itemsPerPage = 5;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredProducts = products.filter(product =>
    product[searchCategory].toString().toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (id) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      const newName = prompt("Nhập tên mới:", productToEdit.name);
      if (newName !== null) {
        setProducts(products.map(product => 
          product.id === id ? { ...product, name: newName } : product
        ));
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => window.location.href = '/add-product'}>Thêm mới hàng hóa</Button>
          <div className="flex gap-2">
            <Select 
              value={searchCategory} 
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="name">Tên</option>
              <option value="price">Giá</option>
              <option value="quantity">Số lượng</option>
            </Select>
            <Input 
              type="text" 
              placeholder={`Tìm kiếm theo ${searchCategory}...`} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Danh sách hàng hóa</h2>
        <Table className="border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Tên</th>
              <th className="border p-2">Giá</th>
              <th className="border p-2">CPU</th>
              <th className="border p-2">Lưu trữ</th>
              <th className="border p-2">Số lượng</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={product.id} className="border hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.cpu}</td>
                <td className="border p-2">{product.storage}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2 flex gap-2">
                  <Button variant="secondary" onClick={() => handleEdit(product.id)}>Chỉnh sửa</Button>
                  <Button variant="destructive" onClick={() => handleDelete(product.id)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination total={filteredProducts.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
      </CardContent>
    </Card>
  );
};

export default ProductInfoPage;
