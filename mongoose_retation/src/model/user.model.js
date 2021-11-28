const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("user", userSchema);