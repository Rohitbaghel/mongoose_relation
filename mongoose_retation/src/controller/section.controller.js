const express = require('express')

const sections=require("../model/section.model")
const book_detail= require("../model/book.model")

const router = express.Router()


// section ----------------------------------------------------------------

router.get("", async (req, res) => {
    const section = await sections.find().lean().exec();
    res.send(section);
  });
  
  router.get("/:id", async (req, res) => {
    const section = await sections.findbyid().lean().exec();
    res.send(section);
  });
  
  router.get("/:id/book", async (req, res) => {
    const section = await sections.findById(req.params.id).lean().exec();
    const book = await book_detail
      .find({ section_id: section._id })
      .lean()
      .exec();
  
    res.send({ book, section });
  });
  
  router.post("", async (req, res) => {
    const section = await sections.create(req.body);
    res.send(section);
  });
  
  router.patch("/:id", async (req, res) => {
    const section = await sections.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    res.send(section);
  });
  
  router.delete("/:id", async (req, res) => {
    const section = await sections.findByIdAndDelete(req.params.id).lean().exec();
    res.send(section);
  });

  

  module.exports = router

