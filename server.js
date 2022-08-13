/////////////////////////////////////////
// DEPENDENCIES
/////////////////////////////////////////
require("dotenv").config();
const { PORT = 3001, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override");
const Painting = require("./models/painting.js");

/////////////////////////////////////////
// DATABASE CONNECTION
/////////////////////////////////////////
const db = mongoose.connection;
// Establish connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are now disconnected from MongoDB"))
  .on("error", (error) => console.log(error));

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// const PaintingSchema = new mongoose.Schema({
//   Title: { type: String, required: true, unique: true },
//   Image: { type: String, required: true },
//   Description: { type: String, required: true },
//   AvailableForPurchase: { type: Boolean, required: true },
//   Price: { type: Number, required: true },
// });

// const Painting = mongoose.model("Painting", PaintingSchema);

/////////////////////////////////////////
// MIDDLEWARE
/////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //prevent cors errors
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json
app.use(methodOverride("_method"));
app.use(express.json());

/////////////////////////////////////////
// ROUTES
/////////////////////////////////////////

// test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// INDEX ROUTE
app.get("/paintings", async (req, res) => {
  try {
    res.json(await Painting.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.post("/paintings", async (req, res) => {
  try {
    res.json(await Painting.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE ROUTE
app.delete("/paintings/:id", async (req, res) => {
  try {
    res.json(await Painting.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE ROUTE
app.put("/paintings/edit/:id", async (req, res) => {
  try {
    res.json(
      await Painting.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

//SHOW
app.get("/paintings/:id", async (req, res) => {
  try {
    res.json(await Painting.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});


/////////////////////////////////////////
// LISTENER
/////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
