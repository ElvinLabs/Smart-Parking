var nconf = require('nconf');

function config(){
    //nconf.argv().env("_");
    //var environment = nconf.get("NODE:ENV") || "development";
    //nconf.file(environment, environment +".json");
    nconf.file("default", "development.json");
}

config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports = new config();