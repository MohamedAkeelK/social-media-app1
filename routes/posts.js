const express = require("express");
const router = express.Router();
const PostsModel = require("../models/postsModel");

// posts/ routes
router.get("/new", (req, res) => {
  res.render("posts/new", { post: new PostsModel() });
});

router.get("/:id", async (req, res) => {
  const post = await PostsModel.findById(req.params.id);
  if (post == null) res.redirect("/");
  res.render("posts/show", { post: post });
});

router.get("/edit/:id", async (req, res) => {
  const post = await PostsModel.findById(req.params.id);
  if (post == null) res.redirect("/");
  res.render("posts/edit", { post: post });
});

// router.post("/", async (req, res, next) => {
//   let post = new PostsModel({
//     userName: req.body.userName,
//     message: req.body.message,
//     imageUrl: req.body.imageUrl,
//   });
//   try {
//     await post.save();
//     res.redirect(`posts/${post.id}`);
//   } catch (e) {
//     res.render("posts/new", { post: post });
//   }
// });

// function savePostAndRedirect(path) {
//   return async (req, res) => {
//     let post = req.body;
//     post.userName = req.body.userName;
//     post.message = req.body.message;
//     post.imageUrl = req.body.imageUrl;
//     try {
//       console.log("ff");
//       post = await post.save();
//       res.redirect(`/posts/${post.id}`);
//     } catch (e) {
//       res.render(`posts/${path}`, { post: post });
//     }
//   };
// }

// router.post(
//   "/",
//   async (req, res, next) => {
//     req.post = new PostsModel();
//     console.log("ff");
//     next();
//   },
//   savePostAndRedirect("new")
// );

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const post = new PostsModel({
    userName: req.body.userName,
    message: req.body.message,
    imageUrl: req.body.imageUrl,
  });

  post.save().then(() => console.log("Saved new post"));
  res.json(post);

  // let post = new PostsModel({
  //   userName: req.body.userName,
  //   message: req.body.message,
  //   imageUrl: req.body.imageUrl,
  // });
  // try {
  //   await post.save();
  //   res.redirect(`posts/${post.id}`);
  // } catch (e) {
  //   res.render("posts/new", { post: post });
  // }
});

router.put("/:id", async (req, res, next) => {
  req.post = await PostsModel.findById(req.params.id);
  // let post = req.body;
  post.userName = req.body.userName;
  post.message = req.body.message;
  post.imageUrl = req.body.imageUrl;
  try {
    console.log("ff");
    post = await post.save();
    res.redirect(`/posts/${post.id}`);
  } catch (e) {
    res.render(`posts/${path}`, { post: post });
  }
});

// router.delete("/:id", async (req, res) => {
//   await PostsModel.findByIdAndDelete(req.params.id);
//   // res.send("delete request");
//   res.redirect("/");
// });
router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.id });
    res.json(removedPost);
    console.log("deleted post");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
