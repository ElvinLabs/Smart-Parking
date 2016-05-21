/**
 * Created by ajantha on 5/12/16.
 */


//var app = require('../bin/www'),
    request = require('supertest');
var should = require('should');
var assert = require('assert');
var bcrypt   = require('bcrypt-nodejs');
//console.log(bcrypt.hashSync("123456", bcrypt.genSaltSync(8), null));

var server = request.agent("http://localhost:3000");

describe('Routing', function() {


    it("should not return home page without login, should redirect to login page",function(done){
        server
            .get("/")
            .expect("login");
            done();

    });

    it("should return login page",function(done){
        // calling api
        server
            .get("/login")
            .expect("Content-type",/html/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });



});
