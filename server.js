const express = require("express");
const dbConnect = require('./dbConnect');
const itemsRoute = require("./routes/itemsRoute");
const userRoute = require("./routes/userRoute");
const billRoute = require("./routes/billsRoute");
const checkAuth = require("./middleware/check-auth");
//const session = require('express-session');
//const MongoDBStore = require('connect-mongodb-session')(session);
//const csrf = require('csurf');



const app = express();
const port = 5000;

// const store = new MongoDBStore({
//     uri: 'MONGO_URL',
//     collection: 'sessions'
// });

//const csrfProtection = csrf();

app.use(express.json());

// app.use(session({
//     secret: 'VWSRxg0zTYfuGpMX',
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//         maxAge: 300000
//       }
// })); 

// app.use(csrfProtection);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use("/api/users/", userRoute);

app.use(checkAuth);

app.use("/api/items/", itemsRoute);
app.use("/api/bills/", billRoute);

app.use((error, req, res, next) => {
    res.status(error.statusCode).send(error);
    //next();
})

app.listen(port, () => console.log(`Node JS server running at ${port}!`));
