const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CatagorySchema = new Schema({
    category_name: { type: String, require: true, maxLength: 50 },
})

CatagorySchema.virtual("url").get(function() {
    return `/category/${this._id}`;
})