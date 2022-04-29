const express = require("express");
const router = express.Router();
const axios = require('axios');
const ObjectId = require('mongodb').ObjectId;

const Claim = require("../models/claims");


router.post("/quote", (req, res) => {

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
    .then((response) => {
        res.send(response.data)
    })
    .catch((error) => {
        console.log(error);
    });
})


router.post("/submit_claim", (req, res) => {
    var age = _calculateAge(req.body.date_of_birth)
    var bmi = _calculateBMI(req.body.height, req.body.weight)
    var children = parseInt(req.body.children)
    var sex = req.body.sex.toLowerCase();
    var smoker = req.body.smoker.toLowerCase();
    var region = req.body.region.toLowerCase();
    var charges = parseFloat(req.body.claimAmount);
    const claim = new Claim({
        age: age,
        sex: sex,
        bmi: bmi,
        children: children,
        smoker: smoker,
        region: region,
        charges: charges
    })
    claim.save()
        .then((result) => {
            console.log(result)
            res.send(JSON.stringify(result._id));
        })
        .catch((err) => {
            console.log(err)
        })
});


router.post("/search_claim", (req, res) => {
    const claimid = new ObjectId(req.body._id);
    Claim.findById(claimid)
        .then((result) => {
            res.send(result)
        })
        .then((err) => {
            console.log(err)
        })
})


function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - Date.parse(birthday);
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function _calculateBMI(height, weight) {
    return Math.round(weight / ((height / 100) ** 2) * 100) / 100
}


module.exports = router;