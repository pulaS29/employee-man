var mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
    name: String,
    surname: String,
    contact: String,
    email: String,
    role: String
});


module.exports = mongoose.model("Employee", employeeSchema);