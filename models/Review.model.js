const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
    title: {
        type: String,
        required: [true, "Title is required."]
    },
    comment: {
        type: String,
        required: [true, "Comment is required."]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required."],
        enum: [1,2,3,4,5]
    },
    created_by: [{ type: Schema.Types.ObjectId, ref: "User" }],

    reviewed_user: [{ type: Schema.Types.ObjectId, ref: "User" }]  
    },

    {timestamp: true}
)

const Review = model("Review", reviewSchema);

module.exports = Review;
   







