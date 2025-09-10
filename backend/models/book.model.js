import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    cover: String,
    link: String,
    rating: Number,
    description: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    reviews: [{
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      rating: {type: Number, required: true, min: 0, max: 5},
      review: {type: String, required: true},
      createdAt: {type: Date, default: Date.now}
    }]
  },
  {timestamps: true}
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;

