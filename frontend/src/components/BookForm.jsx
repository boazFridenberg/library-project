import React, { useState, useEffect } from "react";

export default function BookForm({ onSubmit, initial = null, onCancel }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setAuthor(initial.author || "");
      setYear(initial.year || "");
      setCategory(initial.category || "");
    } else {
      setTitle(""); setAuthor(""); setYear(""); setCategory("");
    }
    setError("");
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("you must fill in a title and author name");
      return;
    }
    const payload = { title: title.trim(), author: author.trim() };
    if (year) payload.year = Number(year);
    if (category) payload.category = category.trim();
    onSubmit(payload);
  };

  return (
    <div className="card">
      <form onSubmit={submit}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <strong>{initial ? "Edit a book" : "Add a new book"}</strong>
          {onCancel && <button type="button" className="btn secondary" onClick={onCancel}>Cancellation</button>}
        </div>
        <div className="form-row">
          <label className="small">title *</label>
          <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="small">author *</label>
          <input className="input" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div className="row">
          <div style={{flex:1}} className="form-row">
            <label className="small">year</label>
            <input className="input" value={year} onChange={e => setYear(e.target.value)} />
          </div>
          <div style={{width:140}} className="form-row">
            <label className="small">category</label>
            <input className="input" value={category} onChange={e => setCategory(e.target.value)} />
          </div>
        </div>
        {error && <div style={{color:"red",marginBottom:8}}>{error}</div>}
        <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
          <button type="submit" className="btn">{initial ? "Save" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}