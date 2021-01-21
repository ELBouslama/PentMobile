
// creating the schema for Employee 
const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String ,
    tel: String ,
    picture: String ,
    salary: String ,
    position: String , 


})

// creating a model from the schema defined .
mongoose.model("employee",EmployeeSchema )