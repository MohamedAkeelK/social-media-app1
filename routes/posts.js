const express = require("express");
const router = express.Router();
// Database
const PostsModel = require("../models/postsModel");

// posts/...  GET routes

// GET a new post, render new.ejs
router.get("/new", (req, res) => {
  res.render("posts/new", { post: new PostsModel() });
});

// GET an individual post, render show.ejs
router.get("/:id", async (req, res) => {
  const post = await PostsModel.findById(req.params.id);
  if (post == null) res.redirect("/");
  res.render("posts/show", { post: post });
});

// GET an individual post, render edit.ejs
router.get("/edit/:id", async (req, res) => {
  const post = await PostsModel.findById(req.params.id);
  if (post == null) res.redirect("/");
  res.render("posts/edit", { post: post });
});

// posts/...  POST routes

// CREATE a post, redirect to render show.ejs
router.post("/", async (req, res, next) => {
  let post = new PostsModel({
    userName: req.body.userName,
    message: req.body.message,
    imageUrl: req.body.imageUrl,
  });
  try {
    await post.save();
    res.redirect(`posts/${post.id}`); // render show.ejs save post and redirect to individual post, posts/:id
  } catch (e) {
    console.log(e);
    res.render("posts/new", { post: post }); // if err render new.ejs
  }
});

// EDIT a post
router.post("/edit/:id", async (req, res, next) => {
  let post = await PostsModel.findById(req.params.id);
  post.userName = req.body.userName;
  post.message = req.body.message;
  post.imageUrl = req.body.imageUrl;
  try {
    console.log("edit request");
    post = await post.save();
    res.redirect(`/posts/${post.id}`);
  } catch (e) {
    console.log("error");
    res.render(`posts/${path}`, { post: post });
  }
});

// DELETE a post, redirect to index homepage
router.post("/:id", async (req, res) => {
  console.log("delete request");

  await PostsModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
