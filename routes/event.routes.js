const express = require("express");
const router = express.Router();
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.get("/events", (req, res) => {

    Event.find()
        .populate("created_by")
        .then((events) => {
            res.json(events);
        })
        .catch((err) => console.log(err));
});


router.post("/events/create/new", isAuthenticated, (req, res) => {

    const { title, content, created_by, image_url, date, location } = req.body;

    const newEvent = {
        title: title,
        content: content,
        created_by: created_by,
        image_url: image_url,
        date: date,
        location: location,
    }

    Event.create(newEvent)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => console.log(err));

});

router.get("/events/:eventId", (req, res) => {

    const {eventId} = req.params

    Event.findById(eventId)
    .populate("created_by")
        .then((event) => {
            res.json(event);
        })
        .catch((err) => console.log(err));
})

router.get("/events/created/:userId", isAuthenticated, (req, res) => {
    const { userId } = req.params;

    Event.find({ created_by: userId })
        .populate("created_by")
        .then((respond) => {
           res.json(respond);
        })
        .catch((err) => console.log(err));

});

router.delete("/events/delete/:eventId",  isAuthenticated, (req, res, next) => {

    const {eventId} = req.params

    Event.findByIdAndRemove(eventId)
    .then((deletedEvent)=>{
        res.json(deletedEvent)
    })
    .catch(err => console.log(err))
});

module.exports = router; 