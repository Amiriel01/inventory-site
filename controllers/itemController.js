const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

//Display a list of all items//
exports.item_list = asyncHandler(async (req, res, next) => {
    const itemInstances = await Item.find().populate().exec()
    res.render("item_list", {
        item_list: itemInstances
    });
});

//Display a detail page for each item//
exports.item_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not Created Yet: Item Detail:
    ${req.params.id}`);
});

//Display Item create form on GET//
exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Item Create GET");
});

//Handle Item create on POST//
exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Item Create Post")
});

//Display Item delete form on GET//
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Item Delete GET");
});

//Handle Item delete on POST//
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Item Delete POST");
});

//Display Item update form on GET//
exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Item Update GET");
});

//Handle Item update on POST//
exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Item Update POST");
});