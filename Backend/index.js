// Initialization
import app from './app.js';
import mongoose from 'mongoose';

const uri = "mongodb+srv://Devshrestha:Devshresthaa@professionals.gfwha8b.mongodb.net/?retryWrites=true&w=majority&appName=Professionals";

const clientOptions = { 
  serverApi: { 
    version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};

const port = 3000;

// Mongoose connection + Start server after DB is connected
async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to MongoDB");

    // Start server only after DB connects
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });

  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit the app if DB connection fails
  }
}

run();

