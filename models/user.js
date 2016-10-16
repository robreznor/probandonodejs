var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var posibles_valores =["M","F"];

var password_validation = {
	validator: function(p){
		return this.password_confirmation == p;

	},
	message: "Las contraseñas son distintas"
}

var email_match = [/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,"Dirección de correo invalida"]

var user_schema = new Schema({
	name: String,
	username: {type: String, required: true, maxlength:[50,"Username muy grande"]},
	password: {
		type: String, 
		minlength:[8,"El password es muy corto"],
		validate: password_validation
	},
	age: {type: Number, min: [5,"La edad no puede ser menor a 5 años"],max: [100,"La edad no puede ser mayor a 6 años"]},
	email: {type: String, required: "El correo es obligatorio", match: email_match },
	date_of_birth: Date,
	sex: {type: String, enum:{values: posibles_valores, message: "Opcion no válida"}}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;