const express = require("express");
// console.log(express)

const connect = require("./config/db");






const bookController = require("./controller/book.controller")

const authorController = require("./controller/author.controller")

const sectionController= require("./controller/section.controller")

const userController = require("./controller/user.controller")

const app = express();

app.use(express.json());

app.use("/book",bookController)
app.use("/user",userController)
app.use("/author",authorController)
app.use("/section",sectionController)




app.listen(2345, async (req, res) => {
  await connect();
  console.log("listening on port 2345");
});
