const express = require('express')
// console.log(express)
const mongoose = require('mongoose')

const connect= ()=>{
    return mongoose.connect("  mongodb://127.0.0.1:27017/library")
}
// console.log(connect);
const sectionSchema= new mongoose.Schema({
    "subject":{type:String,required:true},

},
{
    versionKey:false,
    timestamps:true,
})


const sections =  mongoose.model("section",sectionSchema)




const bookSchema= new mongoose.Schema({
    book_name:{type:String, required:true},
    body:{type:String, required:true},
    publishing_year:{type:Number, required:true},
    pages:{type:Number, required:true},
    sectionId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"section",
     required:true
    },
    authorId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required:true
    }]
},
{
    versionKey:false,
    timestamps:true,
})

const book_detail = mongoose.model('book',bookSchema)

const authorSchema = new mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
   
},
{
    versionKey:false,
    timestamps:true,
})


const author_detail = mongoose.model("author",authorSchema)


const userSchema= new mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true,
        
    }
},
{
    versionKey:false,
    timestamps:true,
})

const user_detail = mongoose.model("user",userSchema)



const app = express()

app.use(express.json())
// book-------------------------------

app.get("/book",async(req, res) => {
    const book = await book_detail.find().lean().exec()
    res.send(book)
})

app.get("/book/:id",async(req, res) =>{
    const book = await book_detail.findById().lean().exec()
    res.send(book)
})


app.get("/book/author/:id/section/:id",async(req, res) =>{
    const book = await book_detail.find({bookId:book._id}).lean().exec()
    const author = await author_detail.findById(req.params.id).lean().exec()
    const section = await sections.findbyid(req.params.id).lean().exec()

    res.send({book,author,section})


})




app.post("/book",async(req, res) => {
    const book = await book_detail.create(req.body)
    res.send(book)
})


app.patch("/book/:id",async(req, res) => {

    const book = await book_detail.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.send(book)
})

app.delete("/book/:id",async(req, res) => {
    const book = await book_detail.findByIdAndDelete(req.params.id).lean().exec()

    res.send(book)
})
// book-------------------------------



app.get('/author', async (req, res) =>{
    const author = await author_detail.find().lean().exec()
    res.send(author)
})


app.get('/author/:id', async (req, res) =>{
    const author = await author_detail.findbyid().populate("bookId").lean().exec()
    res.send(author)
})

app.get('/author/:id/book', async (req, res) =>{
    const author = await author_detail.findById(req.params.id).lean().exec()
    const book = await book_detail.find({author_id:author._id}).lean().exec()

    res.send({ book,author })
})



app.post("/author", async (req, res) =>{
    const author = await author_detail.create(req.body)
    res.send(author)
})


app.patch("/author/:id", async (req, res) =>{
    const author = await author_detail.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.send(author)
})


app.delete("/author/:id", async (req, res) =>{

    const author = await author_detail.findByIdAndDelete(req.params.id).lean().exec()
    res.send(author)
})

// section ----------------------------------------------------------------

app.get('/section', async (req, res) =>{
    const section = await sections.find().lean().exec()
    res.send(section)
})


app.get('/section/:id', async (req, res) =>{
    const section = await sections.findbyid().lean().exec()
    res.send(section)
})



app.get('/section/:id/book', async (req, res) =>{
    const section = await sections.findById(req.params.id).lean().exec()
    const book = await book_detail.find({section_id:section._id}).lean().exec()

    res.send({ book,section })
})




app.post("/section", async (req, res) =>{
    const section = await sections.create(req.body)
    res.send(section)
})


app.patch("/section/:id", async (req, res) =>{
    const section = await sections.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.send(section)
})


app.delete("/section/:id", async (req, res) =>{

    const section = await sections.findByIdAndDelete(req.params.id).lean().exec()
    res.send(section)
})





// section ----------------------------------------------------------------


// user ----------------------------------------------------------------
app.get('/user', async (req, res) =>{
    const user = await user_detail.find().populate("bookId").lean().exec()
    res.send(user)
})


app.get('/user/:id', async (req, res) =>{
    const user = await user_detail.findbyid().lean().exec()
    res.send(user)
})


app.post("/user", async (req, res) =>{
    const user = await user_detail.create(req.body)
    res.send(user)
})


app.patch("/user/:id", async (req, res) =>{
    const user = await user_detail.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.send(user)
})


app.delete("/user/:id", async (req, res) =>{

    const user = await user_detail.findByIdAndDelete(req.params.id).lean().exec()
    res.send(user)
})



// user ----------------------------------------------------------------


app.listen(2345,async (req,res)=>{
    await connect()
    console.log("listening on port 2345");
})