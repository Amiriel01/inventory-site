// const category = require("../models/category");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
// const CategoryInstance = require("../models/categoryinstance");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");


//Display a list of all categories//
exports.category_list = asyncHandler(async (req, res, next) => {
    const categoryInstances = await Category.find().populate().exec()
    res.render("category_list", {
        category_list: categoryInstances
    });
});


//Display a detail page for each category//
exports.category_detail = asyncHandler(async (req, res, next) => {
    // const category = await Category.findById(req.params.id).exec()
    const [category, allTeaInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({ category_id: req.params.id }).exec(),
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
exports.category_create_get = (req, res, next) => {
    res.render("category_form", { title: "Create New Category"});
};

//Handle Category create on POST//
exports.category_create_post = [
    //validate and sanitize the category_name field//
    body("category_name", 'Tea category is blank.')
    //trim so there is no white space around the name//
    .trim()
    //check to make sure it is at least 5 characters//
    .isLength({ min: 1 })
    .escape(),

    //process request after validation and sanitation//
    asyncHandler(async (req, res, next) => {
        //extract the validation errors from the request//
        const errors = validationResult(req);

        //create tea category object with escaped and trimmed information//
        const category = new Category({ category_name: req.body.category_name });

        if (!errors.isEmpty()) {
            //If there are errors, render the form again with the sanitized values/error messages.
            res.render("category_form", {
                title: "Create New Category",
                category: category,
                errors: errors.array(),
            });
            return;
        } else {
            //Form data is valid. Check to be sure the tea category does not already exist//
            const categoryExists = await Category.findOne({ category_name: req.body.category_name })
            //use collation to check for letter case matches so that words with capitals and lower cases don't create duplicates//
            .collation({ locale: "en", strength: 2 })
            .exec();
            if (categoryExists) {
                //category already exists, redirect to it's detail page//
                res.redirect(categoryExists.url);
            } else {
                await category.save();
                //after category is saved, redirect to category page//
                res.redirect(category.url);
            }
        }
    }),
]

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