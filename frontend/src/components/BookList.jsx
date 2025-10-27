import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books, onEdit, onDelete, onView }) {
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>books ({books.length})</h3>
      <div className="book-list">
        {books.length === 0 ? <div className="small">no matching books</div> :
          books.map(b => (
            <BookCard key={b.id} book={b} onEdit={onEdit} onDelete={onDelete} onView={onView} />
          ))
        }
      </div>
    </div>
  );
}