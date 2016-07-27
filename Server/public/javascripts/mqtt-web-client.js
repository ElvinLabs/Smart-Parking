/**
 * Created by ajantha on 7/26/16.
 */

console.log("=========================");
var client = new MqttClient({
    host:"192.168.8.101",
    port:1883
});
client.connect(); // you add a ws:// url here
client.subscribe("nodeData");

client.on('connect', function () {
   console.log("===============connect to the server===================");
});

client.on("message", function(topic, payload) {
    alert([topic, payload].join(": "));
    //client.end();
});

client.publish("mqtt", "hello world!");
