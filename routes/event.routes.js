const express = require("express");
const router = express.Router();
const Event = require("../models/Event.model");
// const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.get("/events", (req, res) => {

    Event.find()
        .populate("created_by")
        .then((events) => {
            res.json(events);
        })
        .catch((err) => console.log(err));
});


router.post("/events/create/new", (req, res) => {

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
            console.log("Event created", result);
            res.send("event created")
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

router.get("/events/:userId", (req, res) => {
    const { userId } = req.params;

        Event.find({ created_by: userId })
        .populate("created_by")
        .then((events) => {
            res.json(events);
        })
        .catch((err) => console.log(err));

});

module.exports = router; 