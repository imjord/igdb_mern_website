const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const db = require("./config/connection");
const routes = require("./routes/index");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      maxAge: 3600000,
    },
  })
);
app.use("/api", routes);
// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  console.log("MongoDB working");
  app.listen(port, () => {
    console.log(`server open on ${port}`);
  });
});
