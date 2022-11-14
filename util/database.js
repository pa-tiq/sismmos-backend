const mongoose = require("mongoose");
const keys = require("../keys.json");

const mongoConnect = (callback) => {
  mongoose.connect(
    `mongodb+srv://patiq:${keys.mongodb_patiq}@node.czwrcvu.mongodb.net/messages?retryWrites=true&w=majority`
  )
    .then((result) => {
      console.log("Connected to the database!");
      callback(result);
    })
    .catch((err) => {
      console.log(err);
    });  
};

module.exports = mongoConnect;