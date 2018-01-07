var myConfig = require('./myConfig');

var server = require('http').createServer(),
  url = require('url'),
  bodyParser = require('body-parser'),
  mysql = require('mysql'),
  express = require('express'),
  app = express(),
  serialPort = require("serialport"),
  port = myConfig.SERVER_PORT;


// This object holds the information for the database connection
var dbConnection = mysql.createConnection({
  host: myConfig.DB_HOST,
  user: myConfig.DB_USER,
  password: myConfig.DB_PASSWORD,
  database: myConfig.DB_NAME
});

// these is the data model as stored in the MySQL Database
// Keys must correspond to the table names in the database
// and to the arduino header file JSONKeys.h

var dbDataModel = myConfig.dataModel;
//      4    3   1   5  2   6   7   0
var temperatures = {
  Temp: [41, 0.69, 14.38,-10.13, -29.9, 8.31, 21]
};

// set up a connection the the mySQL database
dbConnection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... " + err);
  }
});

function storeTemperatures(temps) {
  var timeStamp = new Date();
  console.log('Storing Data');
  console.log(temps);
  var tempValues = temps["Temp"];
  console.log(tempValues);
  for (i = 0; i < tempValues.length; i++) {
    dbDataModel.time = timeStamp;
    dbDataModel.num = i;
    dbDataModel.temp = tempValues[i];

    dbConnection.query('INSERT into Temperatures Set ?', dbDataModel, function(err, result) {
      if (err)
        console.log(err);
    })
  }
};

// console.log(query.sql);
// console.log(dbDataModel);
var arduinoPort = new serialPort(myConfig.SERIAL_INTERFACE, {
    baudRate: myConfig.SERIAL_BAUDRATE
  },
  function(err) {
    console.log(err);
    //console.log(arduinoPort);
    // var serialSimulator = setInterval(() => storeTemperatures(temperatures), 2000);
  }
);

const serialReadline = serialPort.parsers.Readline;
var serialParser = new serialReadline();
arduinoPort.pipe(serialParser);

arduinoPort.on('error', function(err) {
  console.log('Error: ', err.message);
});

// Switches the port into "flowing mode"
serialParser.on('data', function(data) {
  temperatures = data;
  storeTemperatures(temperatures);
  console.log(temperatures);
});

var router = express.Router();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


// REST API
router.post("/temperatures", function(req, res) {
  console.log(req.body);
  try {
    var queryString = 'SELECT ' +
      ' time,  ' +
      ' num, '+
      ' temp ' +
      ' FROM Temperatures ' +// note that is the name of the SQL table as defined in CreateSchema.sql
      ' WHERE num =' + req.body.num + ' ' +
      'AND +time BETWEEN \'' + req.body.start + '\'' +
      ' AND \'' + req.body.end + '\'';
    console.log(queryString);
  } catch (err) {
    console.log("wrong syntax in clients query in html body");
    return;
  }

  dbConnection.query(queryString, function(err, rows, fields) {
    if (!err) {
      res.status(200).json({
        status: 'success',
        data: rows
      });
    } else {
      res.status(500).json({
        status: 'error',
        error: "Internal server error"
      });
      console.log('Error while performing Query.' + err);
    }

  });

  console.log(req.body.start);
});

router.get("/temperatures", function(req, res) {
  dbConnection.query('SELECT * from Temperatures ', function(err, rows, fields) {

    if (!err) {
      // console.log('Query result: ', rows);
      // res.setHeader('Content-Type', "aplication/json");

      res.status(200).json({
        status: 'success',
        data: rows
      });
      // res.end('this is the query result');
    } else {
      res.status(500).json({
        status: 'error',
        error: "Internal server error"
      });
      console.log('Error while performing Query.' + err);
    }
  });
});

router.get("/CurrentTemperatures", function(req, res) {
  if (arduinoPort.isOpen) {
    res.status(200).json({
      status: 'success',
      data: JSON.parse(temperatures)
    })
  } else {
    /*
    res.status(500).json({
        status: 'error',
        error: 'no connection to arduino'
        */
    res.status(200).json({
      status: 'success',
      data: temperatures
    })
  }
});

// Register the routes
// the REST api will be prefixed with /api
app.use('/api', router);

// the angular client uses the public directory.
// The node js server does not only provide a REST api but also
// serves the angular application
app.use(express.static('../client/dashboard/dist'));
app.use(redirectunmatched);

function redirectunmatched(request, response) {
  // console.log(request);
  response.redirect("/index.html");
}

server.on('request', app);
server.listen(port, function() {
  console.log('Listening on ' + server.address().port);

});
