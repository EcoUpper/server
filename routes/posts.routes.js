const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model")


router.get("/posts", (req, res) => {
    Post.find()
        .populate("created_by")
        .then((posts) => {
            res.render("posts");
        })
        .catch((err) => console.log(err));
});

router.post("posts/new", (req, res, next) => {
    const { content, created_by, image_url } = req.body;
    Post.create({
        content,
        created_by,
        // created_by: req.session.currentUser.username,
        image_url,
    })
        .then((result) => {
            console.log("Post created", result);
            res.redirect("/posts");
        })
        .catch((err) => next(err));
});

router.post("/posts/:postsId", (req, res, next) => {
    
    const { content, created_by, image_url } = req.body;

    const updatedPost= {
        content: content,
        created_by: created_by,
        image_url: image_url
    }

    Post.findByIdAndUpdate(postsId, updatedPost, { new: true })

    .then((newPost) => {
        res.json(newPost);
    })
    .catch((err) => next(err));

})



router.get("/posts/:userId", (req, res) => {
    const { userId } = req.params;

    Post.find({ created_by: userId })
        .populate("created_by")
        .then((posts) => {
            res.render("user-posts");
        })
        .catch((err) => next(err));
});

router.get("/posts/batch/create", (req, res) => {
    const obj = [
        {
            "content": "This is the first post.",
            "created_by": "6151a4a5e8779c0015dbae61",
            "image_url": "https://example.com/image1.jpg",
          },
          {
            "content": "Another post here.",
            "created_by": "6151a4a5e8779c0015dbae63",
            "image_url": "https://example.com/image2.jpg",
          },
        ]

    Post.find({ created_by: userId })
        .then((posts) => {
            res.send("post created");
        })
        .catch((err) => next(err));
});



module.exports = router; 