var express = require("express");
var router  = express.Router();
var Employee = require("../models/employee");
var middleware = require("../middleware");
var request = require("request");

//CREATE - add new category to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to category array
   var emp_name = req.body.name;
   var emp_surname = req.body.surname;
   var emp_contact = req.body.contact;
   var emp_email = req.body.email;
   var emp_role = req.body.role;

    var newEmployee = {name: emp_name, surname: emp_surname, contact: emp_contact, email: emp_email, role: emp_role};
    // Create a new campground and save to DB
    Employee.create(newEmployee, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to category page
            console.log(newlyCreated);
            res.redirect("/employee");
        }
    });
}); 

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("employee/new"); 
});

//see employees
router.get("/show", middleware.isLoggedIn, function(req, res){
   res.render("employee/show"); 
});

router.get("/", function(req, res){
    // Get all campgrounds from DB
    Employee.find({}, function(err, allEmployees){
       if(err){
           console.log(err);
       } else {
          res.render("employee/index",{employees:allEmployees});
       }
    });
});

router.get("/:id", function(req, res){
    //find the campground with provided ID
    Employee.findById(req.params.id).exec(function(err, foundEmployee){
        if(err){
            console.log(err);
        } else {
            console.log(foundEmployee);
            //render show template with that campground
            res.render("employee/show", {employee: foundEmployee});
        }
    });
});

router.get("/:id/edit", function(req, res){
    console.log("IN EDIT!");
    //find the campground with provided ID
    Employee.findById(req.params.id, function(err, foundEmployee){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("employee/edit", {employee: foundEmployee});
        }
    }); 
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, surname: req.body.surname, contact: req.body.contact, email: req.body.email, role: req.body.role};
    Employee.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, employee){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/employee/" + employee._id);
        }
    });
});

router.delete("/:empid", function(req, res){
    Employee.findByIdAndRemove(req.params.empid, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect("/employee/" + req.params.id);
        }
    });
});

module.exports = router;
