import React, { useState } from 'react';

function AddStock () {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ itemName, price, quantity, supplier });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Nhập kho</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Chọn hàng hoá đã từng nhập kho</label>
        </div>
        <div>
          <label>Tên hàng</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <span> VND</span>
        </div>
        <div>
          <label>Hình ảnh hàng hoá</label>
          <img
            src="" 
            alt="Product"
            style={{ width: '150px', height: 'auto', margin: '10px 0' }}
          />
        </div>
        <div>
          <label>Số lượng nhập</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nhà cung cấp</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm vào kho</button>
        <button type="button" style={{ marginLeft: '10px' }}>Hủy</button>
      </form>
    </div>
  );
};

export default AddStock;