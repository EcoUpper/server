const express = require("express");
const router = express.Router();
const Item = require("../models/Item.model");
const Proposal = require("../models/Proposal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// Route to get all the proposals of an specific item 
router.get('/proposals/:itemId', isAuthenticated, (req, res) => {
    const itemId = req.params.itemId;
    // const 

    Item.findById(itemId)
        .populate("proposals")
        .then((item) => {
            res.json(item.proposals)
        })
        .catch((err) => {
            console.log("Proposals not found", err);
        })

});


router.post('/proposals/:itemId/new', (req, res) => {

    const {itemId} = req.params
    const {date, status, created_by} = req.body;
    Proposal.create({date, status, created_by:created_by})
    .then((proposal)=>{
        console.log(proposal);
        return Item.findByIdAndUpdate(itemId, {$push:{proposals : proposal._id}})
    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err) =>{
        console.log("Proposals not found", err);
    })
  });


router.delete('/proposals/:itemId/:propId', (req, res) => {
    const propId = req.params.propId;
    const {itemId} = req.params
    
    Proposal.findByIdAndRemove(propId) 
    .then(() =>{
        console.log("proposal removed");
        return Item.findByIdAndUpdate(itemId, { $pull: { proposals: propId  } }, {new : true})
    })
    .then((result)=>{
        res.send(result)
    })
    .catch((err) =>{
        console.log("Proposal not found", err);
    })
  });

//   PUT

// router.put('/proposals/:propId', isAuthenticated, (req, res) => {
//     const propId = req.params.propId;
//     const { status, created_by } = req.body;
//     const userId = req.payload._id
//     // look for the item that has this proposal
//     // then you check if the req.payload._id === owner

//     Item.find({ "proposals": { $in: [propId] } })
//         .then((item) => {
//             const itemCreatorId = item.created_by

//             if (userId === created_by || userId === itemCreatorId) {

//                 Proposal.findByIdAndUpdate(propId, { status: status }, { new: true })
//                     .then((proposal) => {
//                         res.json(proposal);
//                         console.log("Proposal id working");

//                     })
//                     .catch((err) => {
//                         console.log("Proposal not found", err);
//                     })
//             }
//         })

// });



module.exports = router;