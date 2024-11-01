import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    // connect to local db
    await mongoose.connect("mongodb://localhost:27017/blogDB", {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

export default ConnectDB;
