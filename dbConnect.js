const mongoose = require("mongoose");

const URL =
  "MONGO_URL";

mongoose.connect(URL).then( result => {
    console.log("DB Connected");
}).catch( err => {
    console.log("DB Connection Failed");
});
