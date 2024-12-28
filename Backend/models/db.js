const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connection error : ", err);
  });
