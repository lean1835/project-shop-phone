
const DATA_URL = 'src/data/db.json';  

export const getSuppliersFromJson = async (page, limit, searchQuery = '') => {
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();

        const filteredData = data.filter(supplier =>
            supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            supplier.code.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        return paginatedData;
    } catch (error) {
        console.error('Lỗi khi đọc dữ liệu từ file JSON:', error);
        throw error;
    }
};

export const addSupplier = async (newSupplier) => {
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();

        const newSupplierWithId = { ...newSupplier, id: data.length + 1 };  
        data.push(newSupplierWithId);

        console.log("Thêm nhà cung cấp thành công:", newSupplierWithId);

        return newSupplierWithId; 
    } catch (error) {
        console.error('Lỗi khi thêm nhà cung cấp:', error);
        throw error;
    }
};

export const updateSupplier = async (id, updatedSupplier) => {
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();

        const supplierIndex = data.findIndex(supplier => supplier.id === id);
        if (supplierIndex === -1) {
            throw new Error('Nhà cung cấp không tìm thấy');
        }

        data[supplierIndex] = { ...data[supplierIndex], ...updatedSupplier };

        console.log(`Cập nhật nhà cung cấp ID ${id}:`, data[supplierIndex]);

        return data[supplierIndex]; 
    } catch (error) {
        console.error('Lỗi khi cập nhật nhà cung cấp:', error);
        throw error;
    }
};
