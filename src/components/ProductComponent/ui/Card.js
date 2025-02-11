import React from "react";

export const Card = ({ children }) => (
  <div className="border rounded-lg p-4 shadow-md">{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
