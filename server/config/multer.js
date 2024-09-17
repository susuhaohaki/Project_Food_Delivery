const multer = require("multer");
const path = require("path");

// Cấu hình Multer để lưu file tạm thời
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file theo thời gian hiện tại
  },
});

const upload = multer({ storage });
module.exports = upload;
