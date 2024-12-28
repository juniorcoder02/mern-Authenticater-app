const express = require("express"); //require express
const app = express(); //initialize express
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); //load env variables from .env file
require("./models/db"); //require database connection
const AuthRouter = require("./routes/AuthRouter"); //router
const productRouter = require("./routes/productRouter");

const PORT = process.env.PORT || 3000; //load port from .env file or default port set to 3000;

app.get("/", (req, res) => {
  res.send("Hello world !");
});

app.use(bodyParser.json()); //bodyparser middleware to parse JSON
app.use(cors({
  origin:"http://localhost:5173", //frontend origin 
})); //cors middleware to handle cross origin requests

// Routes
app.use("/auth", AuthRouter);
app.use("/products", productRouter);
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
