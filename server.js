const express = require("express");
var path = require("path");
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3000;


// Middleware and static file config
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// Connect to mongoDB and listen to port
app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })


app.get("/", async(req, res) => {
    let url = "https://insurance-pricing-api.herokuapp.com/";

    axios({
        method:'get',
        url
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});
