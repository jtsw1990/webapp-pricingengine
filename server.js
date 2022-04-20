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

/*
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
*/

app.get("/", async (req, res) => {
    res.render("pages/index.ejs")
})


app.post("/quote", (req, res) => {

    var age = _calculateAge(req.body.date_of_birth)
    var bmi = _calculateBMI(req.body.height, req.body.weight)
    var children = parseInt(req.body.children)
    var female_flag = () => { if (req.body.sex === "Female") { return 1 } else { return 0 } }
    var male_flag = () => { if (req.body.sex === "Male") { return 1 } else { return 0 } }
    var smoker_no_flag = () => { if (req.body.smoker === "No") { return 1 } else { return 0 } }
    var smoker_yes_flag = () => { if (req.body.smoker === "Yes") { return 1 } else { return 0 } }
    var northeast_flag = () => { if (req.body.region === "Northeast") { return 1 } else { return 0 } }
    var northwest_flag = () => { if (req.body.region === "Northwest") { return 1 } else { return 0 } }
    var southeast_flag = () => { if (req.body.region === "Southeast") { return 1 } else { return 0 } }
    var southeast_flag = () => { if (req.body.region === "Southeast") { return 1 } else { return 0 } }
    var pricing_payload = {
        age: age,
        bmi: bmi,
        children: children,
        sex_female: female_flag(),
        sex_male: male_flag(),
        smoker_no: smoker_no_flag(),
        smoker_yes: smoker_yes_flag(),
        region_northeast: northeast_flag(),
        region_northwest: northwest_flag(),
        region_southeast: southeast_flag(),
        region_southwest: southeast_flag()
    }

    let url = "https://insurance-pricing-api.herokuapp.com/";
    axios({
        method:'post',
        url,
        data: pricing_payload
    })
    .then(function (response) {
        res.render("pages/quote.ejs", { body: response.data })
    })
    .catch(function (error) {
        console.log(error);
    });

})


function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - Date.parse(birthday);
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function _calculateBMI(height, weight) {
    return Math.round(weight / ((height / 100) ** 2) * 100) / 100
}