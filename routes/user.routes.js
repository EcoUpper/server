const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Item = require("../models/Item.model");
const Post = require("../models/Post.model");
const Proposal = require("../models/Proposal.model");
const Event = require("../models/Event.model");


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
})


// POST ROUTE TO DELETE USER
router.delete("/users/:userId", (req, res, next) => {

    const userId = req.params.userId;


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

})


module.exports = router;
