const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")


const app = express();

// const is used. it is okay when pushing item into the array.
const items= ["Buy Food", "Cook Food", "Eat Food"]; 
const workItems = ["Code", "Test"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get ("/", function(req , res) {

    const day = date.getDate(); // calling the date functions from date.js

    res.render("list", {listTitle: day, newListItems: items });    

}); 


app.post("/", function(req, res) {   
    const item = req.body.newItem;

    if (req.body.list === "Work") { // console log first to check the correct value

        workItems.push(item);
        res.redirect("/work");
        
    } else {
    items.push(item);
    res.redirect("/");
    
    };

    console.log(req.body);

});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems } );
});


app.get("/about", function(req, res) {
    res.render("about");
})

app.listen(3000, function (){
    console.log("Server running at port 3000");
});