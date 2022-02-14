const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static("src/static"));

app.get("/", (req, res) => {
  res.redirect("/getstarted");
});

app.get("/getstarted", (req, res) => {
  res.render("getstarted");
});


app.listen(PORT, function (err) {
  if (err) return console.log(err);
  console.log(`Successfully Listening on ${PORT}`);
});
