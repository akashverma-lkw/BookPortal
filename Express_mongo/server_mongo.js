const express=require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cors = require("cors")

app.use(cors(
var corsOptions = {
                    origin: ["https://vercel.com/akash-vermas-projects-c7c850c7/book-portal"],
                    methods : ["POST", "GET"],
                    credentials: true
                   };
));

app.set("Content-Type","application/json")

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/mernproject");



const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },description:{
        type:String,
        required:true
    },name:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true
    }
})

const books = mongoose.model("Book",bookSchema)

app.post('/api/books',async (req,res)=>{
    console.log("POST called...")
    const task_book=new books({
        title:req.body.title,
        description:req.body.description,
        name:req.body.name,
        price:req.body.price

    })

    try{
        const newBook = await task_book.save()
        res.status(201).json(newBook)   
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

    app.get("/api/books", async (req,res)=>{
        try{
            const data=await books.find();
            app.set("Content-Type","application/json");
            res.send(data)
            console.log(data);
        }catch(err){
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    })

    //Get one Book
    app.get("/api/books/:id", getBook,(req,res)=>{
        console.log("Get called findById()")
        res.json(res.book)
    })

    async function getBook(req,res,next){
        try{
            book=await books.findById(req.params.id)
            if(book==null){
                return res.status(404).json({message:'Cannot find Book'})
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({message:err.message})

        }

        res.book=book
        next()
    }

    //Delete one task
    app.delete('/api/books/:id',getBook, async (req,res)=>{
        console.log("Book Delete function called...")
        try{
            await res.book.deleteOne()
            res.json({message:'Book deleted'})
        }catch(err){
            console.log(err)
            res.status(500).json({message:err.message})

        }
    })

    //Update one task using put method
    app.put('/api/books/:id',getBook, async(req,res)=>{
        if(req.body.title==null || req.body.description==null || req.body.name==null || req.body.price==null)
            return res.status(400).json({messsage:'Invalid request body'})
    
    res.book.title=req.body.title
    res.book.description=req.body.description
    res.book.name=req.body.name
    res.book.price=req.body.price

    try{
        const updatedBook=await res.book.save()
        res.json(updatedBook)
    }catch(err){
        console.log(err);
        res.status(400).json({message:err.message})
    }

})


app.listen(8000,(error)=>{
    if(!error){
        console.log("Server started successfully at port 8000")
    }
    else{
        console.log("Error occured",error)
    }
})
