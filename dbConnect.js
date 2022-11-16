const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/gajayana-pos";
// const URL = 'mongodb+srv://jovi:jovi123@cluster0.58ewr.mongodb.net/gajayana-pos'

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/gajayana-pos");

let connectionObj = mongoose.connection;

connectionObj.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

connectionObj.on("error", () => {
  console.log("Mongo DB Connection Failed");
});
