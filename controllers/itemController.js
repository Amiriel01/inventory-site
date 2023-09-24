const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

//Display a list of all items//
exports.item_list = asyncHandler(async (req, res, next) => {
    const itemInstances = await Item.find().populate().exec()
    res.render("item_list", {
        item_list: itemInstances
    });
});

//Display a detail page for each item//
exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category_id").exec()

    res.render("item_detail", {
        item_name: item.item_name,
        item_description: item.item_description,
        item_price: item.item_price,
        number_in_stock: item.number_in_stock,
        item: item,
    })
});

//Display Item create form on GET//
exports.item_create_get = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec()
    res.render("item_form", {
        title: "Create New Item",
        allCategories: allCategories,
    })
});

//Handle Item create on POST//
exports.item_create_post = [

    //validate and sanitize fields//
    body("item_name", "Item name must be completed.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("item_description", "Item description must be completed.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("category_id", "Category id must be completed.")
        .notEmpty()
        .escape(),
    body("item_price", "Item price must be completed.")
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body("number_in_stock", "Number in stock must be completed.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        //extract validation errors from the request//
        const errors = validationResult(req);

        //create item object with escaped and trimmed info//
        const item = new Item({
            item_name: req.body.item_name,
            item_description: req.body.item_description,
            category_id: req.body.category_id,
            item_price: req.body.item_price,
            number_in_stock: req.body.number_in_stock,
        });

        //Once there are no errors, render form again with sanitized values and error messages//
        if (!errors.isEmpty()) {
            //get all categories for the form//
            const allCategories = await Category.find().exec()

            res.render("item_form", {
                title: "Create New Item",
                allCategories: allCategories,
                item: item,
                errors: errors.array(),
            });
        } else {
            //daata from form is valid. Save item.
            await item.save();
            res.redirect(item.url);
        }
    }),
];

//Display Item delete form on GET//
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const itemInstance = await Item.findById(req.params.id).populate().exec()

    res.render("item_delete", {
        title: "Delete Item",
        itemInstance: itemInstance,
    })
});

//Handle Item delete on POST//
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    const itemInstance = await Item.findById(req.params.id);

    await Item.findByIdAndRemove(req.body.itemInstanceid);
    res.redirect("/inventory/items");
});

//Display Item update form on GET//
exports.item_update_get = asyncHandler(async (req, res, next) => {

    const [item, allCategories] = await Promise.all([
        Item.findById(req.params.id).populate("category_id").exec(),
        Category.find().exec(),
    ])

    res.render("item_form", {
        title: "Update Item",
        allCategories: allCategories,
        item: item,
    })
});

//Handle Item update on POST//
exports.item_update_post = [
    //validate and sanitize fields//
    body("item_name", "Item name must be completed.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("item_description", "Item description must be completed.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("category_id", "Category id must be completed.")
        .notEmpty()
        .escape(),
    body("item_price", "Item price must be completed.")
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body("number_in_stock", "Number in stock must be completed.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    //process request after validation and sanitize//
    asyncHandler(async (req, res, next) => {
        //extract to validation errors from the request//
        const errors = validationResult(req);

        //update item object with escaped and trimmed info//
        let item = {
            item_name: req.body.item_name,
            item_description: req.body.item_description,
            category_id: req.body.category_id,
            item_price: req.body.item_price,
            number_in_stock: req.body.number_in_stock,
        };

        if (!errors.isEmpty()) {
            //If there are errors, render the form again with the sanitized values/error messages.

            res.render("item_form", {
                title: "Update Item",
                allCategories: allCategories,
                item: item,
                errors: errors.array(),
            });
            return;
        } else {
            //item has no items, update item and redirect to list of categories//
            item = await Item.findByIdAndUpdate(req.params.id, item);
            return res.redirect(item.url);
        }

    })
]