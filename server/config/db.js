const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
  }

  // Xử lý khi MongoDB bị ngắt kết nối
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
  });
};

module.exports = connectDB;
