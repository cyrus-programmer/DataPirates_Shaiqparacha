var express = require("express");

var router = express.Router();

var database = require("../db");

var hash = require("../utilities/authentication");

var jwt = require("../utilities/jwt");

router.get("/", function (request, response, next) {
  response.render("signup", {
    title: "Sign up Page",
    message: request.flash("success"),
  });
});

router.post("/signup", function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var dob = req.body.dob;
    var gender = req.body.gender;
    password = hash.hashPassword(password);
    var sql = "INSERT INTO login (email, password,role_id) VALUES (?,?,?)";
    database.query(sql, [email, password, 1], function(err, data){
        if(err) throw err;
        var sql1 = "INSERT INTO customer (username, dob, email, gender) VALUES (?,?,?,?)";
        database.query(sql1, [name, dob, email, gender], function(err, data){
            if (err) {
                throw err;
            }
            else{
                console.log("Registered Successfully");
                res.redirect("../components/Home/Home.js");
            }
        });
    });

});

module.exports = router;
