import React from "react";

export default function BookDetails({ book }) {
  if (!book) return (
    <div className="card">
      <div className="small">select a book to view</div>
    </div>
  );

  return (
    <div className="card details">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h3 style={{margin:"4px 0"}}>{book.title}</h3>
          <div className="small">{book.author}</div>
        </div>
        <div className="small">created: {new Date(book.createdAt).toLocaleString()}</div>
      </div>

      <div style={{marginTop:8}}>
        <div className="small">category: <strong>{book.category || "-"}</strong></div>
        <div className="small">year: <strong>{book.year || "-"}</strong></div>
        <div className="small">ID: <strong style={{wordBreak:"break-all"}}>{book.id}</strong></div>
      </div>
    </div>
  );
}