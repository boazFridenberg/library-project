import React from "react";

export default function Header({ onRefresh }) {
  return (
    <div className="header">
      <div className="brand">
        <div className="logo">LB</div>
        <div>
          <div className="title">Library</div>
          <div className="small">ממשק ניהול ספרים</div>
        </div>
      </div>
      <div className="controls">
        <button className="btn secondary" onClick={onRefresh}>רענן</button>
      </div>
    </div>
  );
}
