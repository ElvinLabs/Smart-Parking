/**
 * Created by ajantha on 5/11/16.
 */

var mongoose = require('mongoose');
var uri = "mongodb://localhost/park";

var options = {
    server: { poolSize: 10 }
};
//var db = mongoose.createConnection(uri, options);

var db = mongoose.connect('mongodb://localhost/park',options, function(err){
    if(err) console.log(err);
    else console.log("connected to database successfully");
});

module.exports = db;

