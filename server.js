const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

//Create Express Server
const app = express();
app.use(cors({ origin: "*" }));

// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASS,
//   database: process.env.DB
// });

//Create Static Directory
app.use("/public", express.static(process.cwd() + "/public"));

//Handle Form Submission
app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();

      switch(property) {
        case 'firstName': {
          if(/^[a-zA-Z]+$/.test(fields[property].toString())){
            data[property] = fields[property].toString();
          }
          break;
        }
        case 'lastName': {
          if(/^[a-zA-Z\s'-]+$/.test(fields[property].toString())){
            data[property] = fields[property].toString();
          }
          break;
        }
        case 'email': {
          data[property] = fields[property].toString();
          break;
        }
        case 'zip': {
          if(/[0-9]*/.test(fields[property].toString())){
            data[property] = fields[property].toString();
          }
          break;
        }
        case 'state': {
          data[property] = fields[property].toString();
          break;
        }

        default: {
          break;
        }
      }
    });

    if(data.firstName && data.lastName && data.email && data.zip && data.state) {
      //Valid data, add to database
      console.log(data);

      // const qry = `INSERT INTO contactdemo (first, last, email, zip, state) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.zip}', '${data.state}')`;
      // connection.query(qry, function (err, result) {
      //     if (err) throw err;
      //     console.log("User added!");
      // });

      return res.redirect('/success');
    }
  });
});

//Home Page
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

//Thank You Page
app.route("/success").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/thank-you.html");
});

// connection.connect(error => {
//     if (error){
//         console.log("A error has been occurred");
//         throw error;
//     }
//
//     const qry = "CREATE TABLE contactdemo "
//         + "(id INT AUTO_INCREMENT PRIMARY KEY," +
//         " first VARCHAR(255), last VARCHAR(255), email VARCHAR(255), zip VARCHAR(10), state VARCHAR(5))";
//
//     connection.query(qry, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
//
//     app.listen(PORT, () => {
//         console.log(`Database Connected! Listening on port ${PORT}...`);
//     })
// });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
