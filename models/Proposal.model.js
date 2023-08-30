const { Schema, model } = require("mongoose");

const proposalSchema = new Schema(
    {
    date: {
        type: date,
        required: [true, "Date is required."],
        min: Date.now()
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    
    created_by: [{ type: Schema.Types.ObjectId, ref: "User" }],

    proposed_user: [{ type: Schema.Types.ObjectId, ref: "User" }]  
    },

    {timestamp: true}
)

const Proposal = model("Proposal", proposalSchema);

module.exports = Proposal;
   







