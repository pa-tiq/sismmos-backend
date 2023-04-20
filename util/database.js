const mongoose = require("mongoose");
const keys = require("../keys.json");

const mongoConnect = (callback) => {
  mongoose.connect(
    `mongodb+srv://patiq:${keys.mongodb_patiq}@node.czwrcvu.mongodb.net/sismmos?retryWrites=true&w=majority`
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

// se não conseguir conectar ao mongo, acesse isso: https://cloud.mongodb.com/v2/636e8dccdaec41321e50d6a9#/security/network/accessList e coloque seu IP na lista