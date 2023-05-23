var express = require("express");

var router = express.Router();

var database = require("../db");

var hash = require("../utilities/authentication");

var jwt = require("../utilities/jwt");

router.get("/", function (request, response, next) {
  response.render("login", {
    title: "Login Page",
    message: request.flash("success"),
  });
});

router.post("/signin", function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    var sql = "SELECT * FROM login where email=?";
    database.query(sql, [email], function(err, data){
        if(hash.verifyPassword(password, data[0].password)){
            var sql1 = "SELECT * FROM role where role_id=?";
            database.query(sql1, [data[0].role_id], function(err, data){
                if(data[0].role_name=="Admin"){
                    res.redirect("/inventory");
                    const accessToken =  jwt.signAccessToken({ ...userExist });
                }else{
                    const accessToken =  jwt.signAccessToken({ ...userExist });
                    res.redirect("../components/Home/Home.js");
                }
            });
        }
    });

});

module.exports = router;
