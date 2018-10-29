var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   cat_name: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Category"
      },
      username: String
   }
});

module.exports = mongoose.model("Product", productSchema);