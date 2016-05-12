/**
 * Created by ajantha on 5/10/16.
 */

var express = require('express');
var router = express.Router();
var db = require('../db/db');
var Node = require('../models/node/nodeModel');
var preProcess = require('../common/nodePreProcess');
var nodeProcess = new preProcess();

/* GET home page. */
router.get('/panel', function(req, res, next) {

    var node = new Node({lat:12.5,lng:56.52,lastModified:new Date(),owner:"e-fac"});
    node.save(function(err){
        if(!err) console.log(" node saved successfully");
        else console.log(err);
    });

    res.send(node);
});

router.get('/nodes', function(req,res,next){

    Node.find(function (err, nodes) {
        if (err){
            console.error(err);
            res.json({err:true,msg:err,data:{}});
        }else{
            res.json({err:false,msg:"",data:nodes});
        }
        console.log(nodes);
    });

});


router.get('/nodes/:nodeId', function(req,res,next){
    var id = req.params.nodeId;
    Node.findOne({_id:id},function (err, node) {
        if (err){
            console.error(err);
            res.json({err:true,msg:err,data:{}});
        }else{
            res.json({err:false,msg:"",data:node});
        }
        console.log(node);
    });

});


router.post('/nodes', function(req, res, next) {
    console.log(req.body);
    //var nodes= nodeProcess.doProcessFormData(req.body);
    res.io.sockets.emit("test",nodeProcess.doProcessFormData(req.body));
    res.redirect('/panel')
});


module.exports = router;

