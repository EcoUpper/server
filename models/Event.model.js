const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        content: {
            type: String,
            required: [true, "Content is required"]
        },
        created_by: { type: Schema.Types.ObjectId, ref: "User" },
        image_url: { type: String },
        date: {
            type: Date,
            required: [true, "Date is required"]
        },
        location: {
            type: String,
            required: [true, "Title is required"]
        }
    },

    { timestamps: true }
);

const Event = model("Event", eventSchema);
module.exports = Event;