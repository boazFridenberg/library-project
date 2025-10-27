import React from "react";

export default function BookCard({ book, onEdit, onDelete, onView }) {
  return (
    <div className="book-card">
      <div className="book-meta">
        <div className="book-title">{book.title}</div>
        <div className="book-sub">{book.author} • {book.category || "Not specified"}</div>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn secondary" onClick={() => onView(book.id)}>view</button>
        <button className="btn" onClick={() => onEdit(book)}>edit</button>
        <button className="btn secondary" onClick={() => onDelete(book.id)}>delete</button>
      </div>
    </div>
  );
}