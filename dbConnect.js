const mongoose = require("mongoose");

const URL =
  "mongodb+srv://root:VWSRxg0zTYfuGpMX@cluster0.yj0pxwd.mongodb.net/pos?retryWrites=true&w=majority";

mongoose.connect(URL).then( result => {
    console.log("DB Connected");
}).catch( err => {
    console.log("DB Connection Failed");
});
