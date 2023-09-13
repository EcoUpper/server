const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");
const Post = require("../models/Post.model");
const Proposal = require("../models/Proposal.model");
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// GET ROUTE TO THE USER'S PROFILE
router.get("/users/:userId", (req, res, next) => {

    const userId = req.params.userId;

    User.findById(userId)
    .then((user) => {
        res.json(user)
        // console.log(user) WORKING
    })
    .catch((err) => console.log("User not found", err))
});


// POST ROUTE TO MODIFY USER'S PROFILE
router.put("/users/:userId", (req, res, next) => {

    const userId = req.params.userId;
    const updatedUser = req.body;

    if (userId === req.payload.id) {

        User.findByIdAndUpdate(userId, updatedUser, {new: true})
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            else {
                // console.log("MODIFY ROUTE WORKING") WORKING
                res.json(user);
            }
            })
            .catch((err) => {
                // console.error("Error updating user profile:", err); WORKING
                res.status(500).json({ message: "Internal Server Error" });
            });
        } else {
            res.status(401).json({ message: "Unauthorized user" });
    }
})


// POST ROUTE TO DELETE USER
router.delete("/users/:userId", isAuthenticated, (req, res, next) => {

    const userId = req.params.userId;

    if (userId === req.payload.id) {
        
        User.findByIdAndRemove(userId)
        .then((response) => {
            return Item.deleteMany({ owner : response._id })
        })
        .then(() => {
            return Post.deleteMany({ created_by : userId })
        })
        .then(() => {
            return Proposal.deleteMany({ created_by : userId })
        })
        .then(() => {
            return Event.deleteMany({ created_by : userId })
        })
        .then((response)=>{
            res.json(response)
        })
        .catch((err) => console.log(err))
    } else {
        res.status(401).json({ message: "Unauthorized user" });
    }



})


module.exports = router;
