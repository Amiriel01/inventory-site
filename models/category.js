const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CatagorySchema = new Schema({
    category_name: { type: String, require: true, maxLength: 50 },
    //one category has many items// 
    
})

CatagorySchema.virtual("url").get(function() {
    return `/inventory/category/${this._id}`;
})

module.exports = mongoose.model("Category", CatagorySchema);