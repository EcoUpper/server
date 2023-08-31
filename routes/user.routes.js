const express = require("express");
const router = express.Router();
const Users = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// GET ROUTE TO THE USER'S PROFILE
router.get("/users/:userId", isAuthenticated, (req, res, next) => {

    const userId = req.params.userId;

    Users.findById(userId)
    .then((user) => {
        res.json(user)
        // console.log(user) WORKING
    })
    .catch((err) => console.log("User not found", err))
});


// POST ROUTE TO MODIFY USER'S PROFILE
router.put("/users/:userId", isAuthenticated, (req, res, next) => {

    const userId = req.params.userId;
    const updatedUser = req.body;
    const ownerId = req.payload._id


    if(userId === ownerId) {
        Users.findByIdAndUpdate(userId, updatedUser, {new: true})
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
    }
    else {
        res.status(401).send("No owner rights.")
    }
})


// POST ROUTE TO DELETE USER
router.delete("/users/:userId", isAuthenticated, (req, res, next) => {

    const userId = req.params.userId;
    const ownerId = req.payload._id

    if(userId === ownerId) {
    Users.findByIdAndRemove(userId)
    .then(() => {
        res.send("User is deleted")
    })
    .catch((err) => console.log("User has been deleted"))
    }
    else {
        res.status(401).send("No owner rights.")
    }
})


module.exports = router;
