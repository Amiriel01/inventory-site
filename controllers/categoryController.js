const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

//Display a list of all categories//
exports.category_list = asyncHandler(async (req, res, next) => {
    //just return the name//
    const allCategories = await Category.find({}, "name")
    //sort categories alphabetically//
    .sort({name: 1})
    //populate name instead of id//
    .populate("name")
    //execute query and return a promise//
    .exec();
    //render category list//
    res.render("category_list", { title: "Category List", category_list: allCategories});
});

//Display a detail page for each category//
exports.category_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not Created Yet: Category Detail:
    ${req.params.id}`);
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