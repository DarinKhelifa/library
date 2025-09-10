import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import User from './models/user.model.js';
import Book from './models/book.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';
import path from 'path';


dotenv.config();

cloudinary.config({
  cloud_name : process.env.CLOUD_NAME,
  api_key : process.env.API_KEY,
  api_secret : process.env.API_SECRET,
})

const app = express();

const PORT = process.env.PORT || 5000;

console.log("PORT is", PORT);

const __dirname = path.resolve();

app.use(cors({ 
  origin: process.env.FRONTEND_URL || "https://library-32a5.onrender.com", 
  credentials: true 
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

//Sign up
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("Please fill all the fields");
    }

     const emailExists = await User.findOne({ email });
     if (emailExists) {
       return res.status(400).json({ message: "User already exists" });
     }
     const usernameExists = await User.findOne({ username });
     if (usernameExists) {
       return res.status(400).json({ message: "Username already taken , try another one" });
     }

     // Hqsh the pqssword
      const hashedPassword = await bcryptjs.hash(password, 10); 
      const userDoc = await User.create({
        username,
        email,
        password: hashedPassword,
      })

      // JWT
      if(userDoc){
        const token = jwt.sign(
          { id: userDoc._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }

      return res.status(200).json({ user : userDoc ,message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User invalid" });
    }
    const isPasswordValid = await bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // JWT
      if(user){
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }
      return res.status(200).json({ user : user ,message: "Loged in successfully" });
  } catch (error) {
        res.status(400).json({ message: error.message });

  }
});

//Fetch user

app.get('/api/user', async (req, res) => {
  const {token} = req.cookies ;

    if(!token){
      return res.status(401).json({message: "Unauthorized"});
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }
      const userDoc = await User.findById(decoded.id).select('-password');

      if (!userDoc) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user: userDoc });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
})

app.post('/api/logout', async (req, res) => {
  res.clearCookie("token"); 
  res.status(200).json({ message: "Logged out successfully" });
});

//*****Book Functionalities */

app.post('/api/books', async (req, res) => {
  const { title , author, cover, link, rating, description } = req.body; 
  const {token} = req.cookies ;
    if(!token){
      return res.status(401).json({message: "Unauthorized"});
    }
    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // image process 
      const imageResponse = await cloudinary.uploader.upload(cover, {
        folder : "/library",
      });
      console.log("Image response is ", imageResponse);
      const userDoc = await User.findById(decoded.id).select('-password');

      const book = await Book.create({
        cover : imageResponse.secure_url, 
        title,
        author,
        link,
        rating,
        description,
        user : userDoc,
      });
      res.status(200).json({ book, message: "Book added successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

app.get('/api/fetch-books', async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const books = await Book.find({
         title: { $regex: searchTerm, $options: "i" } , }).sort({ createdAt: -1 }); 
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.get('/api/fetch-book/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate('user' , ['username']);
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.delete('/api/delete-book/:id', async (req, res) => {
  const { id } = req.params;
  const {token} = req.cookies ;
  if(!token){
    return res.status(401).json({message: "Unauthorized"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
    return res.status(401).json({message: "Invalid token"});
  }

  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // delete the image first (extract public_id correctly without folder prefix in destroy)
  const parts = book.cover.split('/');
  const filename = parts[parts.length - 1];
  const publicIdWithoutExt = filename.split('.')[0];

  try {
    await cloudinary.uploader.destroy(`library/${publicIdWithoutExt}`);
  } catch (e) {
    console.log('Cloudinary deletion failed (continuing):', e.message);
  }

  await Book.findByIdAndDelete(id);
  return res.status(200).json({ message: "Book deleted successfully" });

} catch (error) {
  return res.status(400).json({ message: error.message });
}

});
  
// Update book
app.put('/api/update-book/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, cover, link, rating, description } = req.body;
  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Find the book first
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    let updatedCover = cover;
    
    // If cover is a new image (base64), upload to Cloudinary
    if (cover && cover.startsWith('data:image')) {
      // Delete old image if it exists
      if (existingBook.cover) {
        try {
          const parts = existingBook.cover.split('/');
          const filename = parts[parts.length - 1];
          const publicIdWithoutExt = filename.split('.')[0];
          await cloudinary.uploader.destroy(`library/${publicIdWithoutExt}`);
        } catch (e) {
          console.log('Cloudinary deletion failed:', e.message);
        }
      }
      
      // Upload new image
      const imageResponse = await cloudinary.uploader.upload(cover, {
        folder: "/library",
      });
      updatedCover = imageResponse.secure_url;
    }

    // Update the book
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        cover: updatedCover,
        link,
        rating,
        description,
      },
      { new: true } // Return the updated document
    ).populate('user', ['username']);

    res.status(200).json({ book: updatedBook, message: "Book updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist'))); 
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

//Health Check Endpoint

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});
  
 
 


app.listen(PORT, async () => {
  await connectToDB();
  console.log("Server started at PORT", PORT);
});