// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

const newsRoutes = require("./routes/news.routes");
app.use("/api", newsRoutes);

const itemRoutes = require("./routes/item.routes");
app.use("/db", itemRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/db", eventRoutes);

const postRoutes = require("./routes/post.routes");
app.use("/db", postRoutes);

const proposalRoutes = require("./routes/proposal.routes");
app.use("/db", proposalRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/db", userRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
