const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({ 
    item_name: { type: String, required: true, maxLength: 100 },
    item_description: { type: String, required: true, maxLength: 300 },
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    item_price: { type: String, required: true },
    number_in_stock: { type: Number, required: true }
});

ItemSchema.virtual("url").get(function() {
    return `/inventory/item/${this._id}`;
})

module.exports = mongoose.model("Item", ItemSchema);