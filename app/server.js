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


app.get('/my-index3', function (req, res) {
  res.sendFile('index.html' , { root : __dirname});
});

app.get('/my-index4', function (req, res) {
  res.sendFile('index4.html' , { root : __dirname});
});


app.get('/test-1a', (req, res) => {
  MongoClient.connect(mongoUrlLocal, function callback(err) {
    if (err) { throw err;
    } else {
      res.send("connected via local")
    }
  });
});



app.get('/test-1b', (req, res) => {
  MongoClient.connect("mongodb://admin:password@localhost:27017", function callback(err) {
    if (err) { throw err;
    } else {
      res.send("connected via local")
    }
  });
});



app.get('/test-2a', (req, res) => {
  MongoClient.connect(mongoUrlDocker, function callback(err) {
    if (err) { throw err;
    } else {
      res.send("connected via local")
    }
  });
});



app.get('/test-2b', (req, res) => {
  MongoClient.connect("mongodb://admin:password@mongodb:27017", function callback(err) {
    if (err) { throw err;
    } else {
      res.send("connected via local")
    }
  });
});



app.get('/test-3a', (req, res) => {
  MongoClient.connect("mongodb://my-app.intracom.uk:27017", function callback(err) {
    if (err) { throw err;
    } else {
      res.send("connected via local")
    }
  });
});



app.get('/test-4a', (req, res) => {
  MongoClient.connect("mongodb://admin:password@mongodb", function callback(err) {
    if (err) { throw err;
    } else {
      res.send("connected via local")
    }
  });
});



app.get('/test-5a', (req, res) => {
  MongoClient.connect("mongodb://admin:password@mongodb:27017/myDb?authSource=admin", function callback(err) {
    if (err) { throw err;
    } else {
      res.send("connected via local")
    }
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
