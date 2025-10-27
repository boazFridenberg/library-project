const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController");

router.post("/", controller.createBook);

router.get("/", controller.getBooks);

router.get("/:id", controller.getBookById);

router.put("/:id", controller.updateBook);

router.delete("/:id", controller.deleteBook);

module.exports = router;