const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


// Use CORS middleware with options
const corsOptions = {
    origin: "http://localhost:5173", // Frontend URL (or you can use a wildcard like '*')
    methods: ["POST", "GET", "PUT", "DELETE"], // Add any other methods if required
    credentials: true, // If you're sending cookies or credentials with the request
  };
app.use(cors(corsOptions));

// Use body-parser middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb+srv://akashvermastp7:5RUXuaJhkd9lORO6@cluster0.mrrpy.mongodb.net/book-portal?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Book model
const Book = mongoose.model("Book", bookSchema);

// Create a new book (POST)
app.post('/api/books', async (req, res) => {
  const { title, description, name, price } = req.body;
  
  if (!title || !description || !name || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newBook = new Book({ title, description, name, price });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all books (GET)
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a specific book by ID (GET)
app.get("/api/books/:id", getBook, (req, res) => {
  res.json(res.book);
});

// Get book middleware to fetch book by ID
async function getBook(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.book = book;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching the book' });
  }
}

// Delete a book (DELETE)
app.delete('/api/books/:id', getBook, async (req, res) => {
  try {
    await res.book.deleteOne();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting the book' });
  }
});

// Update a book (PUT)
app.put('/api/books/:id', getBook, async (req, res) => {
  const { title, description, name, price } = req.body;
  
  if (!title || !description || !name || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  res.book.title = title;
  res.book.description = description;
  res.book.name = name;
  res.book.price = price;

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Default error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(8000, () => {
  console.log("Server started successfully at port 8000");
});
