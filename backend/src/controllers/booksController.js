const Book = require("../models/Book");

// Create book
exports.createBook = async (req, res) => {
  try {
    const { title, author, year, category } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: "title and author are required" });
    }
    const book = new Book({ title, author, year, category });
    await book.save();
    return res.status(201).json(book.toJSON());
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all books with dynamic filtering
exports.getBooks = async (req, res) => {
  try {
    const filter = {};
    const { author, category, title, year } = req.query;
    if (author) filter.author = new RegExp(author, "i"); // partial case-insensitive
    if (title) filter.title = new RegExp(title, "i");
    if (category) filter.category = new RegExp(category, "i");
    if (year) filter.year = Number(year);
    const books = await Book.find(filter).sort({ createdAt: -1 });
    return res.json(books.map(b => b.toJSON()));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get single book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.json(book.toJSON());
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") return res.status(400).json({ message: "Invalid ID" });
    return res.status(500).json({ message: "Server error" });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const updates = req.body;
    // Validate: do not allow empty title/author if provided
    if (updates.title === "") return res.status(400).json({ message: "title cannot be empty" });
    if (updates.author === "") return res.status(400).json({ message: "author cannot be empty" });

    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.json(book.toJSON());
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") return res.status(400).json({ message: "Invalid ID" });
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") return res.status(400).json({ message: "Invalid ID" });
    return res.status(500).json({ message: "Server error" });
  }
};
