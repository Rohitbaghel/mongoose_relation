const mongoose = require('mongoose')



const bookSchema = new mongoose.Schema(
    {
      book_name: { type: String, required: true },
      body: { type: String, required: true },
      publishing_year: { type: Number, required: true },
      pages: { type: Number, required: true },
      sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
      },
      authorId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "author",
          required: true,
        },
      ],
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("book", bookSchema);