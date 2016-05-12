var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var nodeSchema = new Schema({
	lat:{type:Number},
    lng:{type:Number},
    lastModified:{type:Date},
    owner:{type:String}
});

module.exports = mongoose.model('Node', nodeSchema);