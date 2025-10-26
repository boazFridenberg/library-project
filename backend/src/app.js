const express = require("express");
const cors = require("cors");
const booksRoutes = require("./routes/books");

const app = express();

app.use(cors());
app.use(express.json());

// health
app.get("/", (req, res) => res.json({ message: "Library API is running" }));

app.use("/books", booksRoutes);

// generic 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

module.exports = app;
