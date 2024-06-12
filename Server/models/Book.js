const mongoose = require("mongoose");

// Define a schema for the book
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true // Ensure titles are unique within the publication
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  totalCopies:{
    type:Number,
    required:true,
  },
  copiesAvailable: {
    type: Number,
    required: true,
  },
  SoldCopies:{
    type:Number,
    default:0,
  }
});

const publisherSchema = new mongoose.Schema({
  publisher: { 
    type: String, 
    required: true, 
  },
  books: [bookSchema],
});

// Define models
const Book = mongoose.model("Book", bookSchema);
const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = { Book, Publisher };
