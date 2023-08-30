const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    },
    image_url: {
        type: String,
        required: [true, "Image is required."]
    },
    type: {
        type: String,
        required: [true, "Type is required."],
        enum: ["clothing", "food", "other"],
        default: "other"
    },
    expiration_date: {
        type: Date,
        min: Date.now() + 7*24*60*60*1000,
    },
    proposals: [{ type: Schema.Types.ObjectId, ref: "Proposal" }],
    status: {
        type: String,
        enum: ["available", "reserved", "gifted"],
        default: "available"
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
