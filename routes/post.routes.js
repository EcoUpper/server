const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model")


router.get("/posts", (req, res) => {
    
    Post.find()
        .populate("created_by")
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => console.log(err));
});

router.post("/posts/create/new", (req, res) => {
    const { content, created_by, image_url } = req.body;

    const newPost = {
        content:content,
        created_by: created_by,
        image_url:image_url,
    }

    Post.create(newPost)
        .then((result) => {
            console.log("Post created", result);
            res.send("post created")
        })
        .catch((err) => console.log(err));
});

router.put("/posts/:postId", (req, res, next) => {

    const {postId} = req.params
    
    const { content, created_by, image_url } = req.body;

    const updatedPost= {
        content: content,
        created_by: created_by,
        image_url: image_url
    }

    Post.findByIdAndUpdate(postId, updatedPost, { new: true })

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
            res.json(posts);
        })
        .catch((err) => console.log(err));
});

module.exports = router; 