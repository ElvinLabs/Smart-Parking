/**
 * Created by ajantha on 5/10/16.
 */

var express = require('express');
var router = express.Router();
var db = require('../db/db');
var Node = require('../models/node/nodeModel');
var Place = require('../models/place/placeModel');
var preProcess = require('../common/nodePreProcess');
var nodeProcess = new preProcess();




router.post('/changeState', function(req, res, next) {
    var nodeId = req.body.nodeId;
    var nodeState = req.body.state;
    Node.updateOne({_id:nodeId},functio)
});


router.post('/places', function(req, res){
    console.log(req.body);
    var place = new Place({
        name:req.body.name,
        lat:req.body.latitude,
        lng:req.body.longitude,
        created:new Date()
    });

    Place.findOne({name:req.body.name}, function(err,data){
        if (err) {
            console.log(err);
            res.json({err:true,msg:"Oops can't find place",data:null});
        }else if(data == null){
            place.save(function(err){
                if(!err){
                    console.log(" node saved successfully");
                    res.json({err:false,msg:"Place saved successfully",data:place});
                }else{
                    res.json({err:true,msg:"Oops can't save place",data:null});
                    console.error(err);
                }
            });
        }else{
            console.log("Place already Exist");
            res.json({err:true,msg:"Place already Exist",data:place});
        }
        
    });
});


router.get("/places", function(req,res){
    Place.find(function(err,data){
        if(!err){
            res.json({err:false,msg:"got the places",data:data});
        }else{
            res.json({err:true,msg:"can't get the places",data:null});
        }
    });
});

router.put("/places", function(req,res){
    console.log(req.body);
    Place.findOne({name:res.body.name},function(err,data){
        if(!err){
            console.log("found one",data);
            if(data == null){
                var place = new Place({
                    _id: req.body._id,
                    name: req.body.name,
                    lat: req.body.lat,
                    lng: req.body.lng,
                    created: req.body.created,
                    __v: req.body.__v });

                place.save(function(err){
                    if (!err) {
                        console.log(" place updated successfully");
                        res.json({err:false,msg:"place updated",data:data});
                    } else {
                        console.error(err);
                        res.json({err:true,msg:"couldn't update the place",data:null});
                    }
                });
            }else{
                console.log("place already exist");
                res.json({err:true,msg:"place already exist",data:data});
            }

        }else{
            console.log("error",err);
            res.json({err:true,msg:"can't get the places",data:null});
        }
    });
});



//router.post('/nodes', function(req,res,next){
//
//  var data = res.body.node;
//    res.io.emit('node', data);
//    res.header(200);
//    res.end();
//
//});


router.post('/nodemcu', function(req,res,next){
    var node = req.body.node;
    res.io.sockets.emit('node-mcu',node);
    res.header(200);
    res.end();
});

router.get('/nodemcu', function(req,res,next){
    res.io.sockets.emit('node-mcu',{name:"chana"});
    res.header(200);
    res.end();
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
        nodeId:req.body.nodeId,
        lat:req.body.latitude,
        lng:req.body.longitude,
        lastModified:new Date(),
        owner:req.body.owner
    });
    console.log(node);
    node.save(function(err){
        if(!err){
            console.log(" node saved successfully");
            res.json({err:false,msg:"node saved",data:node});
        } else{
            res.json({err:true,msg:"node can not save",data:null});
            console.error(err);
        }
    });
});

// single update
router.put('/nodes/:id', function(req, res, next) {
    console.log(req.params.id);
    var newNode =req.body.node;
    console.log(newNode);
        console.log("this mongoose object");
        Node.findById(req.params.id, function (err, node) {
            console.log("found the node");
            node.lat = newNode.lat;
            node.lng = newNode.lng;
            node.lastModified = new Date();
            node.owner = newNode.owner;

            node.save(function (err) {
                if (!err) {
                    console.log("node updated successfully");
                    res.json({err:false,msg:"node updated",data:node});
                } else {
                    res.json({err:true,msg:"can't update the node",data:null});
                    console.error(err);
                }
            });
        });
});

// bulk update
// single update
router.put('/nodes/',isLoggedIn, function(req, res, next) {
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
     Node.findById(req.params.id, function (err, node) {
         node.remove(function (err) {
            if (!err) {
                console.log(" node removed successfully");
                res.json({err:false,msg:"node removed",data:node});
            } else {
                res.json({err:true,msg:"can't remove the node",data:null});
                console.error(err);
            }
        });
    });
});

function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports = router;

