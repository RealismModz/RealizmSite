const path = require('path')
const PORT = process.env.PORT || 8080;
module.exports = (express, app) => {
	app.use(express.static(path.resolve(__filename, '..', '..', 'downloads')))

const mongoose              =  require("mongoose");
const passport              =  require("passport");
const bodyParser            =  require("body-parser");
const LocalStrategy         =  require("passport-local");
const passportLocalMongoose =  require("passport-local-mongoose");
const User                  =  require("../Schemas/User");
const config 				=  require("../config");


mongoose.connect(config.mongoose.url);


app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static("src/static"));

app.get("/", (req, res) => {
  res.redirect("/getstarted");
});

app.get("/getstarted", (req, res) => {
  res.render("getstarted");
});

app.get("/robloxscripts", (req, res) => {
	res.render("robloxscripts")
})

app.get("/realizmbot", (req, res) => {
	res.render("realizmbot");
})

app.listen(PORT, function (err) {
  if (err) return console.log(err);
  console.log(`Successfully Listening on ${PORT}`);
});


};