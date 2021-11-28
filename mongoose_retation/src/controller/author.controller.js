const express = require('express')

const author_detail = require("../model/author.model")
const book_detail= require("../model/book.model")

const router = express.Router()


router.get("", async (req, res) => {
    const author = await author_detail.find().lean().exec();
    res.send(author);
  });
  
  router.get("/:id", async (req, res) => {
    const author = await author_detail
      .findbyid()
      .populate("bookId")
      .lean()
      .exec();
    res.send(author);
  });
  
  router.get("/:id/book", async (req, res) => {
    const author = await author_detail.findById(req.params.id).lean().exec();
    const book = await book_detail.find({ author_id: author._id }).lean().exec();
  
    res.send({ book, author });
  });
  
  router.post("", async (req, res) => {
    const author = await author_detail.create(req.body);
    res.send(author);
  });
  
  router.patch("/:id", async (req, res) => {
    const author = await author_detail.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
  
    res.send(author);
  });
  
  router.delete("/:id", async (req, res) => {
    const author = await author_detail
      .findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    res.send(author);
  });
  

module.exports =router