var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var placeSchema = new Schema({
	name:{type:String},
	lat:{type:Number},
	lng:{type:Number},
	created:{type:Date},
	prkType:{type:String, enum:['Indoor','Outdoor']},
	numOfSlots:{type:Number,min:0},
	availableSlots:{type:Number,min:0},
	isDisable:{type:Boolean, default:true}
});

module.exports = mongoose.model('Place', placeSchema);