var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
    local:{
        fName: String,
        lName: String,
        emial: String,
        username:String,
        password:String
    }
});

//$2a$08$TcZBmQZTHM5l4rOWu3UWfewE2OdN3zUq52WaSVek7NqgMJA1MfW0a

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', userSchema);