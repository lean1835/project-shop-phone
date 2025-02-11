import React from "react";

const Select = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border p-2 rounded"
    >
      {children}
    </select>
  );
};

export default Select;
