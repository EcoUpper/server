const express = require("express");
const router = express.Router();

router.get("/items", (req, res, next) => {

    




  res.json("All good in here");
});

module.exports = router;