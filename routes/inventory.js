const express = require("express");
const router = express.Router();

//require controller modules//
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

//inventory routes//

//GET inventory home page//
router.get("/", category_controller.index);

//GET request for creating a Category. (Must come before routes that contine category ids)//
router.get("/category/create", category_controller.category_create_get);

//POST request for creating a Category//
router.post("category/create", category_controller.category_create_post);

//GET request to delete a Category//
router.get("category/:id/delete", category_controller.category_delete_get);

//POST request to delete a Category//
router.post("category/id/delete", category_controller.category_delete_post);

//GET request to update a Category//
router.get("category/id/update", category_controller.category_update_get);

//POST request to update a Category//
router.post("category/:id/update", category_controller.category_update_post);

//GET request for one Category//
router.get("category/:id", category_controller.category_detail);

//GET request for a list of all Categories//
router.get("categories", category_controller.category_list);

//list routes//

//GET request for creating an Item. (Must come before routes that contine item ids)//
router.get("/item/create", item_controller.item_create_get);

//POST request for creating a Item//
router.post("item/create", item_controller.item_create_post);

//GET request to delete a Item//
router.get("item/:id/delete", item_controller.item_delete_get);

//POST request to delete a Item//
router.post("item/id/delete", item_controller.item_delete_post);

//GET request to update a Item//
router.get("item/id/update", item_controller.item_update_get);

//POST request to update a Item//
router.post("item/:id/update", item_controller.item_update_post);

//GET request for one Category//
router.get("item/:id", item_controller.item_detail);

//GET request for a list of all Items//
router.get("items", item_controller.item_list);