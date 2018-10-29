var express = require("express");
var router  = express.Router();
var Category = require("../models/category");
var middleware = require("../middleware");
var request = require("request");


//CREATE - add new category to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to category array
    var cat_name = req.body.cat_name;
    var cat_image = req.body.cat_image;
    var cat_description = req.body.cat_description;

    var newCategory = {cat_name: cat_name, cat_image: cat_image, cat_description: cat_description};
    // Create a new campground and save to DB
    Category.create(newCategory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to category page
            console.log(newlyCreated);
            res.redirect("/hello");
        }
    });
}); 

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("category/new"); 
});


router.get("/", function(req, res){
    // Get all campgrounds from DB
    Category.find({}, function(err, allCategories){
       if(err){
           console.log(err);
       } else {
          res.render("category/index",{categories:allCategories});
       }
    });
});


module.exports = router;