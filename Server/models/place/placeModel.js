var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var placeSchema = new Schema({
	name:{type:String},
	lat:{type:Number},
	lng:{type:Number},
	created:{type:Date},
	type:{type:String, enum:['indoor','outdoor']},
	numOfSlots:{type:Number,min:0},
	freeSlots:{type:Number,min:0},
	isDisable:{type:Boolean, default:true}
});

module.exports = mongoose.model('Place', placeSchema);