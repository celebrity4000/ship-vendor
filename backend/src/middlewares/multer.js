const multer = require("multer");

const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");
const multipleUpload = multer({ storage }).array("files", 5); //upto 5 files
const upload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },
  { name: "files", maxCount: 5 },
]);
const retailerUpload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },
  { name: "businessFile", maxCount: 1 },
]);

module.exports = { singleUpload, multipleUpload, upload, retailerUpload };
