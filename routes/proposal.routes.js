const express = require("express");
const router = express.Router();
const Item = require("../models/Item.model")
const Proposal = require("../models/Proposal.model")



// Route to get all the proposals of an specific item 
router.get('/proposals/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    Proposal.find({item:itemId})
    .then((proposals)=> {
        res.json(proposals)
    })
    .catch((err) =>{
        console.log("Proposals not found", err);
    })

});

router.post('/proposals/:itemId/new', (req, res) => {
    const itemId = req.params.itemId;
    const {date, status, userId} = req.body;
    Proposal.create({date, status, created_by:userId})
    .then((proposals)=> {
        return res.json(proposals)
    })
    .then((proposal)=>{
        return Item.findByIdAndUpdate(itemId, {$push:{proposals:proposal._id}}, {new:true})
    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err) =>{
        console.log("Proposals not found", err);
    })

  });

//   PUT

router.post('/proposals/:propId', (req, res) => {
    const propId = req.params.propId;
    const {status} = req.body
    Proposal.findByIdAndUpdate(propId, {status: status}, {new:true}) 
    .then((proposal) =>{
        res.json(proposal);
        console.log("Proposal id working");

    })
    .catch((err) =>{
        console.log("Proposal not found", err);
    })
    
  });
  


module.exports = router;