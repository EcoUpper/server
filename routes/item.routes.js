const express = require("express");
const router = express.Router();
const Items = require("../models/Item.model");
const Proposal = require("../models/Proposal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


router.get("/items", (req, res, next) => {

    Items.find()
    .populate("owner proposals")
    .then((data)=>{
       res.json(data)
    })
    .catch(err => console.log(err))

});

router.get("/items/:itemId", (req, res, next) => {

    const {itemId} = req.params

    Items.findById(itemId)
    .populate("owner proposals")
    .then((data)=>{
        res.json(data)
    })
    .catch(err => console.log(err))

});

router.put("/items/:itemId", isAuthenticated, (req, res, next) => {

    const {name, description, image_url, type, expiration_date, status, owner, location} = req.body
    const {itemId} = req.params

    const itemObj = {
        name: name,
        description: description,
        image_url: image_url,
        type : type,
        expiration_date: expiration_date,
        status : status,
        owner : owner,
        location : location
    }

        Items.findByIdAndUpdate(itemId, itemObj, { new: true })
        .then((updatedUser)=>{
            return res.json(updatedUser)
        })
        .then((json)=>{
            console.log(json);
            res.json(json)
        })
        .catch(err => console.log(err))

});

router.delete("/items/:itemId", isAuthenticated,  (req, res, next) => {

    const {itemId} = req.params

    Items.findByIdAndRemove(itemId)
    .then((deleted)=>{
         return Proposal.deleteMany({
            _id: {
              $in: deleted.proposals
            }
          })
    })
    .then((data)=>{
        res.json(data)
    })
    .catch(err => console.log(err))

});

router.get("/items/owner/:userId", (req, res) => {

    const {userId} = req.params

    Items.find({owner : userId})
    .populate("proposals")
    .then((data)=>{
        return res.json(data)
    })
    .then((json)=>{
        console.log(json);
        res.json(json)
    })
    .catch(err => console.log(err))

});

router.post("/items/create/new", isAuthenticated, (req, res, next) => {

    const {name, description, image_url, type, expiration_date, status, owner, location} = req.body

    const itemObj = {
        name: name,
        description: description,
        image_url: image_url,
        type : type,
        expiration_date: expiration_date,
        status : status,
        owner : owner,
        location: location,
    }

    Items.create(itemObj)
    .then((json)=>{
        console.log(json);
        res.json(json)
    })
    .catch(err => console.log(err))

});

module.exports = router;