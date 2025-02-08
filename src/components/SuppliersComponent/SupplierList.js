import React, { useEffect, useState } from "react";
import supplierService from "../../services/supplierService";
import { Table, Card, Button, Modal, Form, Spinner } from "react-bootstrap";

const SuppliersComponent = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSupplier, setNewSupplier] = useState({ code: "", name: "", address: "", phone: "", email: "" });
  const [editSupplier, setEditSupplier] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    const data = await supplierService.getAllSuppliers(); // API trả về danh sách suppliers
    setSuppliers(data);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSupplier = async () => {
    if (!newSupplier.code || !newSupplier.name || !newSupplier.address || !newSupplier.phone || !newSupplier.email) return;
    await supplierService.addSupplier(newSupplier);
    setNewSupplier({ code: "", name: "", address: "", phone: "", email: "" });
    fetchSuppliers();
  };

  const handleDeleteSupplier = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhà cung cấp này?")) {
      await supplierService.deleteSupplier(id);
      fetchSuppliers();
    }
  };

  const handleEditClick = (supplier) => {
    setEditSupplier(supplier);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    await supplierService.updateSupplier(editSupplier);
    setShowModal(false);
    fetchSuppliers();
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center mb-4">🏢 Danh Sách Nhà Cung Cấp</h2>

        {/* Form thêm nhà cung cấp */}
        <div className="row g-2 mb-3">
          <div className="col-md-2">
            <Form.Control type="text" name="code" placeholder="Mã nhà cung cấp" value={newSupplier.code} onChange={handleInputChange} />
          </div>
          <div className="col-md-2">
            <Form.Control type="text" name="name" placeholder="Tên" value={newSupplier.name} onChange={handleInputChange} />
          </div>
          <div className="col-md-2">
            <Form.Control type="text" name="address" placeholder="Địa chỉ" value={newSupplier.address} onChange={handleInputChange} />
          </div>
          <div className="col-md-2">
            <Form.Control type="text" name="phone" placeholder="Số điện thoại" value={newSupplier.phone} onChange={handleInputChange} />
          </div>
          <div className="col-md-2">
            <Form.Control type="email" name="email" placeholder="Email" value={newSupplier.email} onChange={handleInputChange} />
          </div>
          <div className="col-md-2 d-grid">
            <Button variant="success" onClick={handleAddSupplier}>➕ Thêm</Button>
          </div>
        </div>

        {/* Hiển thị danh sách nhà cung cấp */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Mã</th>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier, index) => (
                  <tr key={supplier.id}>
                    <td>{index + 1}</td>
                    <td>{supplier.code}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.address}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.email}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(supplier)}>✏️ Sửa</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteSupplier(supplier.id)}>🗑️ Xóa</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">Chưa có nhà cung cấp nào.</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Modal chỉnh sửa nhà cung cấp */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>📝 Chỉnh Sửa Nhà Cung Cấp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editSupplier && (
            <>
              <Form.Control type="text" name="code" value={editSupplier.code} onChange={handleEditChange} className="mb-2" />
              <Form.Control type="text" name="name" value={editSupplier.name} onChange={handleEditChange} className="mb-2" />
              <Form.Control type="text" name="address" value={editSupplier.address} onChange={handleEditChange} className="mb-2" />
              <Form.Control type="text" name="phone" value={editSupplier.phone} onChange={handleEditChange} className="mb-2" />
              <Form.Control type="email" name="email" value={editSupplier.email} onChange={handleEditChange} className="mb-2" />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>❌ Hủy</Button>
          <Button variant="primary" onClick={handleSaveEdit}>💾 Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SuppliersComponent;
