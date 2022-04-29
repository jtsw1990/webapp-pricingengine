if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const routesHandler = require("./routes/handler.js");
const app = express();
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

/*
app.use(express.static(path.join('public')));
app.use((req,res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
*/


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/", routesHandler);

const dbURI = process.env.dbURI;
const PORT = process.env.PORT || 4000;


// Connect to mongoDB and listen to port
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    .then((result) => app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    }))
    .catch((err) =>
        console.log(err)
    );