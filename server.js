const express = require("express");
const mongoose = require("mongoose");
const PostsModel = require("./models/postsModel");
const postsRouter = require("./routes/posts"); // my articles routes
const path = require("path");
const ejs = require("ejs");
require("dotenv/config");

const app = express();
const PORT = 5000;

// connect to database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("connected to database");
  }
);

//middleware
app.set("view engine", "ejs"); // set view engine to ejs
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/posts", postsRouter); // for /posts routes use postsRouter

// GET home route 
app.get("/", async (req, res) => {
  const post = await PostsModel.find().sort({
    createdAt: "desc",
  });
  res.render("posts/index", { post: post });
});

// listen on server
app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
