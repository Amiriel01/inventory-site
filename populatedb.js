#! /usr/bin/env node

console.log(
  'This script populates the inventory-site'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await getCatagories();
  await getItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// Pass the index to the ...Create functions so that, for example,
// category[0] will always be the same category, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, category_name) {
  const category = new Category({ category_name: category_name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${category_name}`);
}

async function itemCreate(index, item_name, item_description, category_name, item_price, number_in_stock) {
  const itemDetail = { 
    item_name: item_name, 
    item_description:item_description,
    category_name: category_name,
    item_price: item_price,
    number_in_stock: number_in_stock,
  };

  const item = new Item(itemDetail);

  await item.save();
  items[index] = item;
  console.log(`Added item: ${item_name}`);
}

async function getCatagories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Green Tea"),
    categoryCreate(1, "Black Tea"),
    categoryCreate(2, "White Tea"),
  ]);
}

// item_name: item_name, 
//     item_description:item_description,
//     category_name: category_name,
//     item_price: item_price,

async function getItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(0,
      "Classic Green Tea",
      "The Classic Green Tea is a simple light green tea.",
      categories[0],
      "2.25",
      "877"
    ),
    itemCreate(1,
      "Peach Green Tea",
      "Peach Green Tea has a light peach flavor.",
      categories[0],
      "3.50",
      "250"
    ),
    itemCreate(2,
      "White Grape Green Tea",
      "Hints of white grape can be found in this light green tea.",
      categories[0],
      "5.50",
      "125"
    ),
    itemCreate(3,
      "Earl Grey",
      "Earl Grey has a black tea base flavored with oil from the rind of bergamot orange.",
      categories[1],
      "3.99",
      "15"
    ),
    itemCreate(4,
      "Vanilla Chai",
      "Vanilla Chai is a tea blend of Yunnan black tea and classic chai spices.",
      categories[1],
      "2.50",
      "87"
    ),
    itemCreate(5,
      "Irish Breakfast Tea",
      "Irish Breakfast Tea is a blend of several black teas.",
      categories[1],
      "4.50",
      "321"
    ),
    itemCreate(6,
      "Classic White Tea",
      "This white tea is a low-caffeine floral-flavored tea.",
      categories[2],
      "6.50",
      "226"
    ),
    itemCreate(7,
      "Raspberry White Tea",
      "This white tea has a hint of raspberry flavor.",
      categories[2],
      "4.50",
      "987"
    ),
    itemCreate(8,
      "Melon White Tea",
      "The Melon White Tea has a strong melon taste that is very refreshing.",
      categories[2],
      "3.75",
      "57"
    ),
  ]);
}

