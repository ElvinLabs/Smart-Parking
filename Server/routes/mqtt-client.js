/**
 * Created by ajantha on 7/19/16.
 */



var request = require('request');
var mqtt = require('mqtt');
// const client = mqtt.connect('tcp://52.24.61.14:1883');
var client = mqtt.connect('tcp://192.168.8.101:1883');
var express = require('express');
var router = express.Router();


module.exports = function (socket) {
    
    var messages = [];
    var message = {
      nodeId:0,
        owner:"",
        isAvailable:false
    };

    var contained = false;

    client.on('connect', function() {
        console.log("connection on");
        subscribe('presence');
        subscribe('nodeData');
        publishJSONObject('nodeData',[{nodeId:100, isAvailable:false,owner:"e-fac"}]);
    });

    function subscribe(topic){
        client.subscribe(topic, function (err, granted) {
            if(err){
                console.log("can't subscribe to ", topic);
            }
            if(granted){
                console.log(" subscribed to ", granted);
            }
        });
    }

    function publishJSONObject(topic, obj) {
        var jsonString = JSON.stringify(obj);
        client.publish(topic, jsonString, function () {
            console.log("published to ",topic);
        });
    }

    function publishString(topic, str) {
        client.publish(topic, str, function () {
            console.log("published to ",topic);
        });
    }

    client.on('message', function (topic, message) {
        // message is a Buffer
        var msg = message.toString();
        // check the data received topic
        if('presence' == topic){
            var json = JSON.parse(msg);
            // console.log(json);
            if( json.nodeId != 'undefined'){
                for (index in messages){
                    if (json.nodeId == messages[index].nodeId){
                        console.log("message already exist");
                        messages[index].isAvailable = json.isAvailable;
                        messages[index].owner = json.owner;
                        contained = true;
                        break;
                    }
                }

                if(!contained){
                    console.log("message does not found in the array");
                    messages.push(json);
                }
                console.log(messages);
                publishJSONObject("nodeData",messages);
                contained = false;
                socket.emit('node-mcu',messages);
            }else{
                console.log("different type of message format");
            }
        }else if('nodeData' == topic){
            console.log(message.toString());
        }
        else{
            console.log('different topic', topic);
            console.log(msg);
        }
        
        

        // if (message != 'undefined'){
        //     request.post({url:'http://127.0.0.1:8000/api/v1/nodemcu', form: {node:message.toString()}}, function (error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //             console.log(body); // Print the google web page.
        //         }
        //     });
        // }

    });

    client.on('reconnect', function () {
        console.log("client is reconnecting");
    });

    client.on('offline', function () {
        console.log("client is offline");
    });

    client.on('close', function () {
        console.log("client closed");
    });

    client.on('error', function (error) {
        console.log("error occurred");
        console.log(error);
        client.end();
    });


    

};




