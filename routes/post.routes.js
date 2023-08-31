const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


router.get("/posts", (req, res) => {
    
    Post.find()
        .populate("created_by")
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => console.log(err));
});

router.post("/posts/create/new", isAuthenticated, (req, res) => {
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

router.put("/posts/:postId", isAuthenticated, (req, res, next) => {

    const {postId} = req.params
    const { content, created_by, image_url } = req.body;
    const ownerId = req.payload._id

    const updatedPost= {
        content: content,
        created_by: created_by,
        image_url: image_url
    }

    if(created_by === ownerId) {
        Post.findByIdAndUpdate(postId, updatedPost, { new: true })
        .then((newPost) => {
            res.json(newPost);
        })
        .catch((err) => next(err));
    }
    else {
        res.status(401).send("No owner rights.")
    }
})

router.get("/posts/:userId", isAuthenticated, (req, res) => {
    const { userId } = req.params;
    const ownerId = req.payload._id

    if(userId === ownerId) {
        Post.find({ created_by: userId })
        .populate("created_by")
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => console.log(err));
    }
    else {
        res.status(401).send("No owner rights.")
    }
});

module.exports = router; 