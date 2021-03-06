var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

app.use("/public",express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.use(cookieSession({
	name: "session",
	keys: ["llave-1","llave-2"]
}));

app.set("view engine", "jade");

app.get("/", function(req, res){
	console.log(req.session.user_id);
	User.find({},function(err,user){
		console.log(user);
		res.render("index");
	});
	
});

app.get("/signup", function(req, res){
		res.render("signup");
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/users", function(req, res){
	var user = new User({email: req.body.email, 
						password: req.body.password, 
						password_confirmation: req.body.password_confirmation,
						username: req.body.username
					});

	user.save().then(function(us){
		res.send("Guardamos el usuario exitosamente");
	}, function(err){
		if(err){
			console.log(String(err));
			res.send("No pudimos guardar la información");
		}
	});
	
});

app.post("/sessions", function(req, res){
	User.findOne({email: req.body.email, password: req.body.password },function(err,user){
		req.session.user_id = user._id;
		res.redirect("/app");
		
	});
});

app.use("/app",session_middleware);
app.use("/app",router_app);

app.listen(8080);