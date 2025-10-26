const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController");

// Create
router.post("/", controller.createBook);

// Read all (with query filters)
router.get("/", controller.getBooks);

// Read single
router.get("/:id", controller.getBookById);

// Update
router.put("/:id", controller.updateBook);

// Delete
router.delete("/:id", controller.deleteBook);

module.exports = router;
