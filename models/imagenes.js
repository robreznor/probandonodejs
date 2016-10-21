var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var img_schema = new Schema({
	title:{type: String, required:true},
	creator:{type: Schema.Types.ObjectId, ref: "User"}
});

var imagen = mongoose.model("Imagen",img_schema);

module.exports = imagen;