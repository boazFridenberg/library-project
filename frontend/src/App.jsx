import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import * as api from "./api/api";

export default function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({});

  const fetchBooks = async (params = {}) => {
    try {
      const data = await api.getBooks(params);
      setBooks(data);
    } catch (err) {
      console.error(err);
      alert("error loading books");
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleCreate = async (payload) => {
    try {
      const newBook = await api.createBook(payload);
      setBooks(prev => [newBook, ...prev]);
      setSelectedBook(newBook);
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "error creating book");
    }
  };

  const handleEditStart = (book) => {
    setEditing(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (payload) => {
    try {
      const updated = await api.updateBook(editing.id, payload);
      setBooks(prev => prev.map(b => b.id === updated.id ? updated : b));
      setSelectedBook(updated);
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "error updating");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("remove the book")) return;
    try {
      await api.deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      if (selectedBook?.id === id) setSelectedBook(null);
    } catch (err) {
      console.error(err);
      alert("error deleting");
    }
  };

  const handleView = (id) => {
    const b = books.find(x => x.id === id);
    setSelectedBook(b || null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const params = {};
    const author = form.get("author").trim();
    const title = form.get("title").trim();
    const category = form.get("category").trim();
    if (author) params.author = author;
    if (title) params.title = title;
    if (category) params.category = category;
    setFilter(params);
    await fetchBooks(params);
  };

  const handleRefresh = async () => {
    setFilter({});
    await fetchBooks();
  };

  return (
    <div className="container">
      <Header onRefresh={handleRefresh} />

      <div className="grid">
        <div>
          <div style={{marginBottom:12}}>
            <BookForm
              onSubmit={editing ? handleUpdate : handleCreate}
              initial={editing}
              onCancel={() => setEditing(null)}
            />
          </div>

          <div className="card" style={{marginTop:12}}>
            <form onSubmit={handleSearch} style={{display:"flex",gap:8,alignItems:"center"}}>
              <input name="title" className="input" placeholder="search by title" />
              <input name="author" className="input" placeholder="search by auther" />
              <input name="category" className="input" placeholder="seearch by category" />
              <button className="btn" type="submit">search</button>
            </form>
            <div style={{marginTop:8}} className="small">active filtering: {Object.keys(filter).length ? JSON.stringify(filter) : "without"}</div>
          </div>

          <div style={{marginTop:12}}>
            <BookList books={books} onEdit={handleEditStart} onDelete={handleDelete} onView={handleView} />
          </div>
        </div>

        <div>
          <BookDetails book={selectedBook} />
        </div>
      </div>
    </div>
  );
}