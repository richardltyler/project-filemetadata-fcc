require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", multer().single("upfile"), async (req, res) => {
  const upfile = req.file;
  
  if (!upfile) {
    res.json({ error: "Please upload a file" });
  } else {
    res.json({
      name: upfile.originalname,
      type: upfile.mimetype,
      size: upfile.size,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
