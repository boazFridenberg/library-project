import React from "react";

export default function BookCard({ book, onEdit, onDelete, onView }) {
  return (
    <div className="book-card">
      <div className="book-meta">
        <div className="book-title">{book.title}</div>
        <div className="book-sub">{book.author} • {book.category || "לא צוינה"}</div>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn secondary" onClick={() => onView(book.id)}>צפה</button>
        <button className="btn" onClick={() => onEdit(book)}>ערוך</button>
        <button className="btn secondary" onClick={() => onDelete(book.id)}>מחק</button>
      </div>
    </div>
  );
}
