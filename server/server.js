const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
// bảo mật
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// định nghĩa cổng
const PORT = process.env.PORT || 8080;

//connect db
connectDB();

//khởi dộng server
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

//api
app.use("/api/customer", customerRoutes);
