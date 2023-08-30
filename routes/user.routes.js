const express = require("express");
const router = express.Router();
const User = require("../models/User.model")


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
router.post("/users/:userId", (req, res, next) => {

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
router.post("/users/:userId/delete", (req, res, next) => {

    const userId = req.params.userId;

    User.findByIdAndRemove(userId)
    .then(() => {
        res.send("User is deleted")
    })
    .catch((err) => console.log("User has been deleted"))
})


module.exports = router;