var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var placeSchema = new Schema({
	name:{type:String},
	lat:{type:Number},
    lng:{type:Number},
    created:{type:Date}, 
});

module.exports = mongoose.model('Place', placeSchema);