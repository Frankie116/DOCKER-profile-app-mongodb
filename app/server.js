let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();
let Db = require('mongodb').Db

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
// let mongoUrlDocker = "mongodb://admin:password@mongodb:27017/myDb?authSource=admin";
let mongoUrlDocker = "mongodb://admin:password@mongodb:27017";



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/hello', (req, res) => {
    res.send('Hello World !')
  });

// ---------------------------------------------------------------------------------------------------------
app.get('/my-dir', (req, res) => {
    res.send(__dirname, "test")
});


app.get('/my-path', (req, res) => {
  res.send(path.join(__dirname, "index.html"))
});


app.get('/my-test0', (req, res) => {
  MongoClient.connect("mongodb://admin:password@localhost:27017", function (err, res) {
    if (err) throw err;

    res.send("connected via local")
  });
});


app.get('/my-test9', (req, res) => {
  MongoClient.connect("mongodb://admin:password@localhost:27017", function callback(err) {
    if (err) { throw err;
    } else {
      res.send("connected via local")
    }
  });
});


app.get('/my-test1', (req, res) => {
  MongoClient.connect("mongodb://admin:password@localhost:27017", function(err, db) {
    test.equal(null, err);
    test.ok(db != null);

    db.collection("replicaset_mongo_client_collection").update({a:1}, {b:1}, {upsert:true}, function(err, result) {
      test.equal(null, err);
      test.equal(1, result);

      db.close();
      test.done();
    });
  });
});


app.get('/my-test2', (req, res) => {
  MongoClient.connect("mongodb://admin:password@mongodb:27017", function(err, db) {
    test.equal(null, err);
    test.ok(db != null);

    db.collection("replicaset_mongo_client_collection").update({a:1}, {b:1}, {upsert:true}, function(err, result) {
      test.equal(null, err);
      test.equal(1, result);

      db.close();
      test.done();
    });
  });
});


app.get('/my-test3', (req, res) => {
  MongoClient.connect(mongoUrlLocal, function (err, res) {
    if (err) throw err;

    res.send("connected via local")
  });
});


app.get('/my-test4', (req, res) => {
  MongoClient.connect("my-app.intracom.uk:27017", function (err, res) {
    if (err) throw err;

    res.send("connected via docker")
  });
});


app.get('/my-test4b', (req, res) => {
  MongoClient.connect("mongodb://my-app.intracom.uk:27017", function (err, res) {
    if (err) throw err;

    res.send("connected via docker")
  });
});


app.get('/my-test5', (req, res) => {
  MongoClient.connect("mongodb://admin:password@mongodb", function (err, res) {
    if (err) throw err;

    res.send("connected via docker")
  });
});

app.get('/my-test6', (req, res) => {
  MongoClient.connect("mongodb://admin:password@mongodb:27017", function (err, res) {
    if (err) throw err;

    res.send("connected via docker")
  });
});


app.get('/my-test7', (req, res) => {
  MongoClient.connect("mongodb://admin:password@mongodb:27017/myDb?authSource=admin", function (err, res) {
    if (err) throw err;

    res.send("connected via docker")
  });
});


app.get('/my-test8', (req, res) => {
  MongoClient.connect("mongodb://admin:password@mongodb:27017/my-db?authSource=admin", function (err, res) {
    if (err) throw err;

    res.send("connected via docker")
  });
});

// ---------------------------------------------------------------------------------------------------------


app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});



app.post('/update-profile', function (req, res) {
  let userObj = req.body;

  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;

    let db = client.db('my-db');
    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
      if (err) throw err;
      client.close();
    });

  });
  // Send response
  res.send(userObj);
});




app.get('/get-profile', function (req, res) {
  let response = {};
  // Connect to the db
  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;

    let db = client.db('my-db');

    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});




app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
