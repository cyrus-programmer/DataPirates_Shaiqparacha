var express = require("express");

var router = express.Router();

var database = require("../db");

router.get("/", function (request, response, next) {
  var query =
    "SELECT reason, customer.username as name FROM frauds join customer on frauds.customer_id = customer.id";
  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.render("frauds", {
        title: "Frauds Page",
        action: "list",
        fraudList: data,
        message: request.flash("success"),
      });
    }
  });
});

router.get("/add", function (request, response, next) {
  var sql =
    "SELECT username, id FROM customer WHERE customer.id NOT IN ( SELECT frauds.customer_id FROM frauds WHERE frauds.customer_id IS NOT NULL);";
  database.query(sql, function (err, data) {
    if (err) throw err;
    response.render("frauds", {
      title: "Add customer into fraud list",
      action: "add",
      fraudList: data,
    });
  });
});

router.post("/add_person", function (req, res, nex) {
  var id = req.body.customer;
  var reason = req.body.reason;
  var sql = "INSERT INTO frauds (customer_id, reason) VALUES (?,?)";
  database.query(sql, [id, reason], function (err, data) {
    if (err) throw err;
    request.flash("success", "Item Inserted");
    response.redirect("/frauds");
  });
});

module.exports = router;
