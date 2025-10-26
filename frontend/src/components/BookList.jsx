import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books, onEdit, onDelete, onView }) {
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>ספרים ({books.length})</h3>
      <div className="book-list">
        {books.length === 0 ? <div className="small">אין ספרים תואמים</div> :
          books.map(b => (
            <BookCard key={b.id} book={b} onEdit={onEdit} onDelete={onDelete} onView={onView} />
          ))
        }
      </div>
    </div>
  );
}
