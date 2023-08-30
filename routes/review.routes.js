const express = require("express");
const router = express.Router();
const Reviews = require("../models/Review.model")


router.post("/reviews/create/:userId", (req, res, next) => {

    const userId = req.params.userId
    const {title, comment, rating, created_by, reviewed_user} = req.body

    const reviewObj = {
        title: title,
        comment: comment,
        rating: rating,
        created_by: created_by,
        reviewed_user: userId,
    }

    Reviews.create(reviewObj)
    .then((newReview)=>{
        console.log(newReview);
        res.send ("Review created sucessfully")
    })
    .catch(err => console.log(err))

});


router.get("/reviews/:userId", (req, res, next) => {

    const userId = req.params.userId

    Reviews.find({reviewed_user: userId})
    .then((data)  => {
        return res.json(data)
    })
    .catch((err) => console.log(err))

})

module.exports = router;