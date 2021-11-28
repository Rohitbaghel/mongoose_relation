const express = require('express')


const user_detail = require("../model/user.model")

const router = express.Router()




router.get("", async (req, res) => {
    const user = await user_detail.find().populate("bookId").lean().exec();
    res.send(user);
  });
  
  router.get("/:id", async (req, res) => {
    const user = await user_detail.findbyid().lean().exec();
    res.send(user);
  });
  
  router.post("", async (req, res) => {
    const user = await user_detail.create(req.body);
    res.send(user);
  });
  
  router.patch("/:id", async (req, res) => {
    const user = await user_detail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    res.send(user);
  });
  
  router.delete("/:id", async (req, res) => {
    const user = await user_detail.findByIdAndDelete(req.params.id).lean().exec();
    res.send(user);
  });
  
  module.exports = router;