var mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
   cat_name: String,
   cat_image: String,
   cat_description: String,
});

module.exports = mongoose.model("Category", categorySchema);