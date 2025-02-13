import React from "react";

export const Button = ({ children, variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-blue-500 text-white px-4 py-2 rounded",
    secondary: "bg-gray-500 text-white px-4 py-2 rounded",
    destructive: "bg-red-500 text-white px-4 py-2 rounded",
  };

  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  );
};
