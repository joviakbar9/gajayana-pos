const mongoose = require("mongoose");

// mongosh mongodb://%2Fhome%2Fgajayana%2Fmongodb-0.sock
// const URL = "mongodb://localhost:27017/gajayana-pos";
const URL = "mongodb+srv://jovi:joviakbar890@cluster0.58ewr.mongodb.net/gajayana-pos";

mongoose.connect(process.env.MONGODB_URI || URL);

let connectionObj = mongoose.connection;

connectionObj.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

connectionObj.on("error", () => {
  console.log("Mongo DB Connection Failed");
});
