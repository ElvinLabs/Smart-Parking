var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

    var nodeSchema = new Schema({
        nodeId:{type:Number,default:0},
        lat:{type:Number},
        lng:{type:Number},
        lastModified:{type:Date},
        owner:{type:String},
        isDisable:{type:Boolean,default:true},
        isActive:{type:Boolean,default:false}
    });


module.exports = mongoose.model('Node', nodeSchema);