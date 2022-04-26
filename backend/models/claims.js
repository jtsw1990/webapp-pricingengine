const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose.Schema is a constructor function
// Main model to hold claims for submission
// TBC whether or not it will be an online model, currently batch trained

const claimSchema = new Schema({
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    bmi: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    smoker: {
        type: String,
        requied: true
    },
    region: {
        type: String,
        required: true
    },
    charges: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Claim = mongoose.model("Claim", claimSchema);
module.exports = Claim;