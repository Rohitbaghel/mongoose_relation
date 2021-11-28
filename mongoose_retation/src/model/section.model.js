const mongoose = require('mongoose')


const sectionSchema = new mongoose.Schema(
    {
      subject: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("section", sectionSchema);