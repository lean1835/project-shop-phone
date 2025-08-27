export const getUriSearchParam = (search) => {
    const searchParams = new URLSearchParams(search);
    return Object.fromEntries(searchParams);
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
};
