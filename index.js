// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const isInvalidDate = (date) => {
  date.toUTCString() === "invalid Date";
};

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  let number = parseInt(date);
  let unix = /^\d+$/.test(date);

  if (unix) {
    let unixDate = new Date(number);
    res.json({
      unix: parseInt(date),
      utc: unixDate.toUTCString(),
    });
  }
  if (!unix) {
    let newDate = new Date(date);
    let UTCdate = newDate.toUTCString();
    if (UTCdate === "Invalid Date") {
      res.json({
        error: "Invalid Date",
      });
    }
    res.json({
      unix: newDate.getTime(),
      utc: UTCdate,
    });
  }
});
app.get("/api", function (req, res) {
  // let date = new Date(req.params.unix);
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
