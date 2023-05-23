var express = require("express");

var router = express.Router();

var database = require("../db");

router.get("/", function (request, response, next) {
  var query = "SELECT * FROM item";

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.render("inventory", {
        title: "Inventory Page",
        action: "list",
        inventory: data,
        message: request.flash("success"),
      });
    }
  });
});

router.get("/add_video", function (request, response, next) {
  response.render("inventory", {
    title: "Add item into inventory",
    action: "add_video",
  });
});

router.get("/add_gear", function (request, response, next) {
  response.render("inventory", {
    title: "Add item into inventory",
    action: "add_gear",
  });
});

router.post("/add_item_video", function (request, response, next) {
  var title = request.body.title;

  var quantity = request.body.quantity;

  var marketprice = parseInt(request.body.market_price);

  var costprice = parseInt(request.body.costprice);
  var margin = costprice - marketprice;
  var age_limit = parseInt(request.body.minimum_age);
  var inventory = 1;
  var genre = request.body.genre;
  var platform = request.body.platform;

  var query = `
	INSERT INTO item 
	(title, quantity, marketprice, costprice, margin, inventory_type, age_limit) 
	VALUES (?,?,?,?,?,?,?);
	`;

  database.query(
    query,
    [title, quantity, marketprice, costprice, margin, inventory, age_limit],
    function (error, data) {
      if (error) {
        throw error;
      } else {
        var query1 = `
	INSERT INTO video_games 
	(genre, platform, item_id) 
	VALUES (?,?,?);
	`;

        database.query(
          query1,
          [genre, platform, data.insertId],
          function (error, data) {
            if (error) {
              throw error;
            } else {
              request.flash("success", "Item Inserted");
              response.redirect("/inventory");
            }
          }
        );
      }
    }
  );
});

router.post("/add_item_gear", function (request, response, next) {
  var title = request.body.title;

  var quantity = request.body.quantity;

  var marketprice = parseInt(request.body.market_price);

  var costprice = parseInt(request.body.costprice);
  var margin = costprice - marketprice;
  var age_limit = parseInt(request.body.minimum_age);
  var inventory = 0;
  var type = request.body.type;
  var compatibility = request.body.compatibility;

  var query = `
      INSERT INTO item 
      (title, quantity, marketprice, costprice, margin, inventory_type, age_limit) 
      VALUES (?,?,?,?,?,?,?);
      `;

  database.query(
    query,
    [title, quantity, marketprice, costprice, margin, inventory, age_limit],
    function (error, data) {
      if (error) {
        throw error;
      } else {
        var query1 = `
      INSERT INTO games_gear 
      (type, compatibility, item_id) 
      VALUES (?,?,?);
      `;

        database.query(
          query1,
          [type, compatibility, data.insertId],
          function (error, data) {
            if (error) {
              throw error;
            } else {
              request.flash("success", "Item Inserted");
              response.redirect("/inventory");
            }
          }
        );
      }
    }
  );
});

function jsonConcat(o1, o2) {
  for (var key in o2) {
    // console.log(key);
    o1[key] = o2[key];
  }
  return o1;
}

router.get("/edit/:id", function (request, response, next) {
  var id = request.params.id;

  var query = `SELECT * FROM item WHERE id = "${id}"`;

  database.query(query, function (error, data) {
    if (data[0].inventory_type == 1) {
      var query1 = `SELECT * FROM video_games WHERE item_id = "${id}"`;
      database.query(query1, function (err, result) {
        if (err) {
          throw err;
        }
        var data2 = {};
        data2 = jsonConcat(data2, data[0]);
        data2 = jsonConcat(data2, result[0]);

        response.render("inventory", {
          title: "Edit Item",
          action: "edit",
          inventory: data2,
        });
      });
    } else {
      var query1 = `SELECT * FROM games_gear WHERE item_id = "${id}"`;
      database.query(query1, function (err, result) {
        var data2 = {};
        data2 = jsonConcat(data2, data[0]);
        data2 = jsonConcat(data2, result[0]);
        response.render("inventory", {
          title: "Edit Item",
          action: "edit",
          inventory: data2,
        });
      });
    }
  });
});

router.post("/edit/:id", function (request, response, next) {
  var id = request.params.id;

  var title = request.body.title;

  var quantity = request.body.quantity;

  var marketprice = parseInt(request.body.market_price);

  var costprice = parseInt(request.body.costprice);
  var margin = costprice - marketprice;
  var age_limit = parseInt(request.body.minimum_age);
  var inventory = request.body.inventory_type;

  var query = `
	UPDATE item 
	SET title = "${title}", 
	quantity = "${quantity}", 
	marketprice = "${marketprice}", 
	costprice = "${costprice}",
  margin = "${margin}",
  age_limit = "${age_limit}"
	WHERE id = "${id}"
	`;

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      if (inventory == "Video Games") {
        var genre = request.body.genre;
        var platform = request.body.platform;
        var query1 = `
	UPDATE video_games 
	SET genre = "${genre}", 
	platform = "${platform}"
	
	WHERE item_id = "${id}"
	`;
        database.query(query1, function (err, data) {
          request.flash("success", "Data Updated");
          response.redirect("/inventory");
        });
      } else {
        var type = request.body.type;
        var compatibility = request.body.compatibility;
        var query1 = `
	UPDATE games_gear 
	SET type = "${type}", 
	compatibility = "${compatibility}"
	
	WHERE item_id = "${id}"
	`;
        database.query(query1, function (err, data) {
          request.flash("success", "Data Updated");
          response.redirect("/inventory");
        });
      }
    }
  });
});

router.get("/delete/:id", function (request, response, next) {
  var id = request.params.id;

  var query = `
	DELETE FROM item WHERE id = "${id}"
	`;

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      request.flash("success", "Data Deleted");
      response.redirect("/inventory");
    }
  });
});

module.exports = router;
