import React from "react";

export default function Loading({ loading = false, children, message = "" }) {
  return loading ? (
    <div className="loading-container">
      <div className="loader">{message}</div>
    </div>
  ) : (
    children
  );
}
