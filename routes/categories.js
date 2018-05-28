var express = require('express');
var router = express.Router();

router.get('/', function(req, res) { 
    connection.query('SELECT * from categories', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }
	});
});

router.post('/', function(req, res) { 
    var sql = 'INSERT INTO categories (CategoryName, Description, Picture) VALUES (?,?,?)';
    var data = [
      req.body.CategoryName,
      req.body.Description,
      req.body.Picture
    ];
    connection.query(sql, data, function(err, result) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({
          errors: ['Could not create categories'+ err.sqlMessage]
        });
      } else {
        res.send(JSON.stringify({"status": 200, "error": null, "message": true}));
      }
    });
});

router.get('/:id', function(req, res) { 
    var CategoryID = req.params.id;
    var sql = 'SELECT * FROM categories WHERE CategoryID = ?';
    connection.query(sql, [ CategoryID ], function(err, result) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({ errors: ['Could not retrieve categories'] });
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
        }
    });
});

router.patch('/:id', function(req, res) {  // update parsial
    var data = JSON.parse(JSON.stringify(req.body));
    var CategoryID = req.params.id;
    var sql = "UPDATE categories set ? WHERE CategoryID = ? ";
    connection.query(sql, [data, CategoryID] , function(err, result) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({
            errors: [err.sqlMessage +" => "+ sql]
            });
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "message": true}));
        }
    });
});

router.put('/:id', function(req, res) {   // must full field
    var CategoryID = req.params.id;
    var sql = "UPDATE categories set ? WHERE CategoryID = ? ";
    var data = {
            CategoryName : req.body.CategoryName,
            Description : req.body.Description,
            Picture : req.body.Picture
        };
        connection.query(sql, [data, CategoryID] , function(err, result) {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          return res.json({
            errors: [err.sqlMessage +" => "+ sql]
          });
        } else {
          res.send(JSON.stringify({"status": 200, "error": null, "message": true}));
        }
    });
});

router.delete('/:id', function(req, res) { 
    var CategoryID = req.params.id;
    var sql = 'DELETE FROM categories WHERE CategoryID = ?';
    connection.query(sql, [ CategoryID ], function(err, result) {
        if (err) {
            console.error(err);
            res.send(JSON.stringify({"status": 200, "error": 'Could not delete categories', "delete": false}));
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "delete": true}));
        }
    });
});

module.exports = router;