const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CLOUDINARY
const fileUploader = require("../config/cloudinary.config");


// SIGNUP POST ROUTE - WORKING
router.post("/signup", fileUploader.single("image_url"), (req, res, next) => {
  const { username, email, password, image_url } = req.body;

  if (username === "" || email === "" || password === "") {
    res.status(400).json({ message: "Provide username, email and password." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // if (!req.file) {
  //   next(new Error("No file uploaded!"));
  //   return;
  // }

  User.findOne({ username })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ username, password: hashedPassword, email, image_url});
    })
    .then((createdUser) => {
      const { username, email, _id, image_url } = createdUser;

      const user = { username, email, _id, image_url };

      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); 
});


// LOGIN POST ROUTE - WORKING
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.status(400).json({ message: "Provide username and password." });
    return;
  }

  User.findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, username, email, image_url} = foundUser;

        const payload = { _id, username, email, image_url};

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

// GET  /auth/verify 
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // console.log(`req.payload`, req.payload);

  res.status(200).json(req.payload);
});

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image_url"), (req, res, next) => {

  console.log("file is: ", req?.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ image_url: req.file?.path });
});






module.exports = router;
