const express = require('express');

const book_detail= require("../model/book.model")

const router = express.Router();


router.get("", async (req, res) => {
    const book = await book_detail.find().lean().exec();
    res.send(book);
  });
  
  router.get("/:id", async (req, res) => {
    const book = await book_detail.findById().lean().exec();
    res.send(book);
  });
  
//   router.get("/book/author/:id/section/:id", async (req, res) => {
//     const book = await book_detail.find({ bookId: book._id }).lean().exec();
//     const author = await author_detail.findById(req.params.id).lean().exec();
//     const section = await sections.findbyid(req.params.id).lean().exec();
  
//     res.send({ book, author, section });
//   });
  
  router.post("", async (req, res) => {
    const book = await book_detail.create(req.body);
    res.send(book);
  });
  
  router.patch("/:id", async (req, res) => {
    const book = await book_detail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(book);
  });
  
  router.delete("/:id", async (req, res) => {
    const book = await book_detail.findByIdAndDelete(req.params.id).lean().exec();
  
    res.send(book);
  });
  

  module.exports = router;