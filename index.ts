const express = require("express");
const exec = require("child_process").exec;
const nodemailer = require("nodemailer");
const cmd = require("node-cmd");
const app = express();
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "mail.itland-sy.com",
  port: 2626,
  secure: false, // true for 465, false for other ports
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "anas.allahham@itland-sy.com", // generated ethereal user
    pass: "P@ssw0rd@itland", // generated ethereal password
  },
});

app.use(express.json());
// routes
app.post("/deploy", (req, res) => {
  const scriptName = req.query.s;
  if (!scriptName || scriptName === "")
    res
      .status(500)
      .json({ error: "please add the script name as a query param 's' " });
  const shellCommand = `sh ${__dirname}/scripts/${scriptName}.sh`;
  res.json({
    status: `Beginning deploy script on ${scriptName}`,
  });
  // Execute our shell script
  cmd.run(
    "echo " +
      "ITL@nd@Server@RED@2021" +
      " | /usr/bin/sudo -S -k " +
      shellCommand +
      " --key " +
      "itland",
    function (err, data, stderr) {
      console.log(
        "examples dir now contains the example file along with : ",
        data,
        err,
        stderr
      );
      transporter
        .sendMail({
          from: "anas.allahham@itland-sy.com", // sender address
          to: "anoslaham@gmail.com,wrazouk91@gmail.com", // list of receivers
          subject: "server publish status ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `<h1>publish successfull</h1><h3>the request</h3><p>${JSON.stringify(
            req.body
          )}</p><h3>the result</h3><p>${stderr}</p><h3>err</h3>${err}<h3>data</h3>${data}`, // html body
        })
        .then(() => {
          console.log("email sent");
        });
    }
  );
});
// error handler

app.use(function (err, req, res, next) {
  res.status(err.status ? err.status : 500);
  res.send(err.message);
});
var server = app.listen(9301, function () {
  console.log("Listening on port %d", server.address().port);
});
