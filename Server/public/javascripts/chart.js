/**
 * Created by ajantha on 5/26/16.
 */
$(document).ready(function () {

    var socket = io();

    socket.on('connect',function(data){
        console.log('connected to ther server');
    });

    socket.on('new-client', function (data) {
        var availableSlots = [];
        var numOfSlots = [];
        var names = [];
        // for(id in data){
        //     names.push(data[id].name);
        //     numOfSlots.push(data[id].numOfSlots);
        //     availableSlots.push(data[id].availableSlots);
        // }
        // generateGraph(names, numOfSlots, availableSlots);
    });

    socket.on('node-mcu', function (data) {
        console.log('node-mcu event data');
        console.log(data);
        var availableSlots = [];
        var numOfSlots = [];
        var names = [];
        // for(id in data){
        //     names.push(data[id].name);
        //     numOfSlots.push(data[id].numOfSlots);
        //     availableSlots.push(data[id].availableSlots);
        // }
        //generateGraph(names, numOfSlots, availableSlots);

    });

    socket.on('connect_error',function(data){
        console.log(' server is offline');
    });

    function generateGraph(labals, data1, data2){
        // Bar chart
        var ctx = document.getElementById("mybarChart");
        var mybarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labals,
                datasets: [{
                    label: '# of Slots',
                    backgroundColor: "#26B99A",
                    data: data1
                }, {
                    label: '# of Available Slots',
                    backgroundColor: "#03586A",
                    data: data2
                }]
            },

            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

});