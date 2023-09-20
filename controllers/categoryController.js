// const category = require("../models/category");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
// const CategoryInstance = require("../models/categoryinstance");
const Item = require("../models/item");


//Display a list of all categories//
exports.category_list = asyncHandler(async (req, res, next) => {
    const categoryInstances = await Category.find().populate().exec()
    //     //render category list//
    res.render("category_list", {
        category_list: categoryInstances
    });
});


//Display a detail page for each category//
exports.category_detail = asyncHandler(async (req, res, next) => {
    // const category = await Category.findById(req.params.id).exec()
    const [category, allTeaInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({ category_name: req.params.id }).exec(),
    ]);

    if (category === null) {
        const err = new Error("Category Not Found");
        err.status = 404;
        return next(err);
    }
    console.log(allTeaInCategory)
    res.render("category_detail", {
        //pass in list of items//
        category_name: category.category_name,
        category_items: allTeaInCategory,
    })
});


//Display Category create form on GET//
exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Category Create GET");
});

//Handle Category create on POST//
exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Category Create Post")
});

//Display Category delete form on GET//
exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Category Delete GET");
});

//Handle Category delete on POST//
exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Category Delete POST");
});

//Display Category update form on GET//
exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Category Update GET");
});

//Handle Category update on POST//
exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not Created Yet: Category Update POST");
});