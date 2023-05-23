const { ifError } = require("assert");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "softecapp",
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;

exports.insertquery = function (
  quantity,
  title,
  marketprice,
  costprice,
  inventory_type,
  age_limit
) {
  inventory = null;
  if (inventory_type == "Video Games") {
    inventory = 1;
  } else if (inventory_type == "Game Gears") {
    inventory = 0;
  }
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected Successfully");
    connection.query(
      "INSERT INTO item (quantity, title, marketprice, costprice, margin, inventory_type, age_limit) VALUES (?,?,?,?,?,?,?)",
      [
        quantity,
        title,
        marketprice,
        costprice,
        costprice - marketprice,
        inventory,
        age_limit,
      ],
      function (err, result) {
        if (err) throw err;
        console.log("Data Inserted Successfully" + result.affectedRows);
      }
    );
  });
};

exports.showInventory = function () {
    connection.connect(function(err){
        if (err) {
            req.flash('error', err);
        }else{
            var sql = "SELECT * FROM item";
            connection.query(sql, function(req, res,err){
                if (err) {
                    req.flash('error', err);
                    res.render('inventory',{page_title:"Inventory",data:""});
                }else{
                        res.render('inventory',{page_title:"Inventory",data:rows});
                    }
            });
        }
    });
};
