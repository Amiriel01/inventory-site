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
    const [item, itemDetail] = await Promise.all([
        Item.findById(req.params.id).populate().exec(),
        // Category.findById(req.params.id).exec(),
        // Item.find({ category_name: req.params.id }).exec(),
    ]);

    if (itemDetail === null) {
        const err = new Error("Item Not Found");
        err.status = 404;
        return next(err);
    }

    res.render("item_detail", {
        item_name: item.item_name,
        item_description: item.item_description,
        category_name: item.category_name,
        item_price: item.item_price,
        number_in_stock: item.number_in_stock,
        itemDetail: itemDetail,
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
    // convert category to an array for choosing from//
    (req, res, next) => {
        if (!(req.body.category_name instanceof Array)) {
            if (typeof req.body.category_name === "undefined") req.body.category_name = [];
            else req.body.category_name = new Array(req.body.category_name);
        }
        next();
    },

    //validate and sanitize fields//
    body("item_name", "Item name must be completed.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("item_description", "Item description must be completed.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("category_name","Category name must be completed.")
        .trim()
        .isLength({ min: 1 })
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
            category_name: req.body.category_name,
            item_price: req.body.item_price,
            number_in_stock: req.body.number_in_stock,
        });

        //Once there are no errors, render form again with sanitized values and error messages//
        if (!errors.isEmpty()) {
            //get all categories for the form//
            const allCategories = await Category.find().exec()

        // //mark selected category with a check mark in form//
        // for (const allCategories of allCategories) {
        //     if (item.allCategories.includes(allCategories.category_name)) {
        //         allCategories.checked = "true";
        //     }
        // }

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