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
        if (!err){
            res.json({err:false,msg:"",data:node});
        }else{
            res.json({err:true,msg:err,data:{}});
            console.error(err);
        }
    });
});

router.post('/nodes', function(req, res, next) {
    var node = new Node({
        lat:req.body.lat,
        lng:req.body.lng,
        lastModified:new Date(),
        owner:req.body.owner
    });
    console.log(node);
    node.save(function(err){
        if(!err){
            console.log(" node saved successfully");
            res.json({err:false,msg:"",data:node});
        } else{
            res.json({err:true,msg:err,data:{}});
            console.error(err);
        }
    });
});

// single update
router.put('/nodes/:id', function(req, res, next) {
    console.log(req.params.nodeId);
    var newNode =req.body.node
    if (Object.isMongooseObject(newNode)) {
        return Node.findById(req.params.id, function (err, node) {

            node.lat = newNode.lat;
            node.lng = newNode.lng;
            node.lastModified = new Date();
            node.owner = newNode.owner;

            return node.save(function (err) {
                if (!err) {
                    console.log(" node saved successfully");
                    res.json({err:false,msg:"",data:node});
                } else {
                    res.json({err:true,msg:err,data:{}});
                    console.error(err);
                }
            });
        });
    }
    //var nodes= nodeProcess.doProcessFormData(req.body);
    //res.io.sockets.emit("test",nodeProcess.doProcessFormData(req.body));
});


// bulk update
// single update
router.put('/nodes/', function(req, res, next) {
    var i, len = 0;
    console.log("is Array req.body.nodes");
    console.log(Array.isArray(req.body.nodes));
    console.log("PUT: (nodes)");
    console.log(req.body.nodes);
    if (Array.isArray(req.body.nodes)) {
        len = req.body.nodes.length;
    }
    for (i = 0; i < len; i++) {
        console.log("UPDATE node by id:");
        for (var id in req.body.node[i]) {
            console.log(id);
        }
        Node.update({ "_id": req.body.nodes[i]}, req.body.nodes[i], function (err, numAffected) {
            if (err) {
                console.log("Error on update");
                console.log(err);
            } else {
                console.log("updated num: " + numAffected);
            }
        });
    }
    return res.send(req.body.nodes);
});



router.delete('/nodes/:id', function(req, res, next) {
    console.log(req.params.id);
    return Node.findById(req.params.id, function (err, node) {
        return node.remove(function (err) {
            if (!err) {
                console.log(" node saved successfully");
                res.json({err:false,msg:"",data:node});
            } else {
                res.json({err:true,msg:err,data:{}});
                console.error(err);
            }
        });
    });
    //var nodes= nodeProcess.doProcessFormData(req.body);
    //res.io.sockets.emit("test",nodeProcess.doProcessFormData(req.body));
});


module.exports = router;

