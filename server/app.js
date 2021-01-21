const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')



// to avoid req.body undefined when accessing data from the frontend - body-parser Middleware : let you access data in the body of a request . 
app.use(bodyParser.json())

//Models access "class"
const Employee = mongoose.model("employee")





/* connecting  to mongodb database */
// creating schema in Employee.js

const mongourl = "mongodb+srv://snikih:Srspremuim123@cluster0-kdotu.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//success log
mongoose.connection.on("connected", () => {
    console.log("mongodb connected ")
})
//error connection log
mongoose.connection.on("error", (err) => {
    console.log("mongodb connection error ", err)
})



/* routes = Endpoints REST API */
app.get("/", (req, res) => {
    Employee.find({}).then((data) => {
        res.send(data)
    }).catch((err) => { console.log(err) })
})

app.post("/send-data", (req, res) => {
    //converting the data stored in the request manually
    const employee = new Employee(req.body);
    // save function from mangoose : té5ou json & and stores in db
    employee.save().then((data) => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })

})

app.post("/delete", (req, res) => {
    Employee.findByIdAndRemove(req.body._id).then((data) => {
        console.log(data);
        res.send(data)
    }).catch((err) => {
        console.log(err);
    })

})

app.post("/update", (req, res) => {
    Employee.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    }).then((data) => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log(err);
    })
})






// server start
app.listen(3000, () => {
    console.log("server is running")
})