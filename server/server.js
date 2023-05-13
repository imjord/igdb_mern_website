const express = require("express");
const app = express();
const port = 3001;
const db = require("./config/connection");
const routes = require("./routes/index");
const cors = require("cors");
const session = require("express-session");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/api", routes);

db.once("open", () => {
  console.log("MongoDB working");
  app.listen(port, () => {
    console.log(`server open on ${port}`);
  });
});
