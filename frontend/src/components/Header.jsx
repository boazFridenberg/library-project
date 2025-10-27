import React from "react";

export default function Header({ onRefresh }) {
  return (
    <div className="header">
      <div className="brand">
        <div className="logo">LB</div>
        <div>
          <div className="title">Library</div>
          <div className="small">Bookkeeping</div>
        </div>
      </div>
      <div className="controls">
        <button className="btn secondary" onClick={onRefresh}>Refresh</button>
      </div>
    </div>
  );
}