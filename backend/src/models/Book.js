const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  year: { type: Number },
  category: { type: String, trim: true }
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

BookSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("Book", BookSchema);