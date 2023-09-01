const { Schema, model } = require("mongoose");

const proposalSchema = new Schema(
    {
    date: {
        type: Date,
        required: [true, "Date is required."],
        min: Date.now()
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    
    created_by: { type: Schema.Types.ObjectId, ref: "User" },

    item_id: { type: Schema.Types.ObjectId, ref: "Item" } 
    },

    {timestamp: true}
)

const Proposal = model("Proposal", proposalSchema);

module.exports = Proposal;
   







