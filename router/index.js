const express = require("express");
var router = express.Router();
const fs = require("fs");
const { fileUpload,getFileStream } = require("../s3");
const upload = require("../common");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/images/:key", (req, res) => {
  const key = req.params.key;
  console.log(req.params.key);
  const readStream = getFileStream(key);
  readStream.pipe(res);  // this line will make image readable
});
router.post("/single", upload.single("image"), async (req, res, next) => {
  console.log(req.file);  // UPLOADED FILE DESCRIPTION RECEIVED
  const result = await fileUpload(req.file);  // Calling above function in s3.js
  console.log("S3 response", result);
  await unlinkFile(req.file.path);//delete from locals onces uploaded in s3
  res.send("uploaded successfully");
});
router.post("/multiple", upload.array("images"), (req, res) => {
  console.log(req.files); // UPLOADED FILE DESCRIPTION RECEIVED
  res.send({
    status: "success",
    message: "Files uploaded successfully",
    data: req.files,
  });
});

module.exports = router;