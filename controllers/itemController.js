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
    const itemDetail = await Item.findById(req.params.id).populate().exec();

    if (itemDetail === null) {
        const err = new Error("Item Not Found");
        err.status = 404;
        return next(err);
    }

    res.render("item_detail", {
        item_name: item_name,
        item_description: item_description,
        category_name: category_name,
        item_price: item_price,
        number_in_stock: number_in_stock,
    })
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