const senseHat = require('node-sense-hat');
const imu = require("node-sense-hat").Imu;
const sense = require("sense-hat-led").sync;
const moment = require('moment');

const O = [0, 0, 0];
const X = [255, 0, 0];

const daysOfWeek = {
    'Monday': [
        X, O, O, O, O, O, O, X,
        X, X, O, O, O, O, X, X,
        X, O, X, O, O, X, O, X,
        X, O, O, X, X, O, O, X,
        X, O, O, O, O, O, O, X,
        X, O, O, O, O, O, O, X,
        X, O, O, O, O, O, O, X,
        X, O, O, O, O, O, O, X,
    ],
    'Tuesday': [
        X, X, X, X, X, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, X, X,
    ],
    'Wednesday': [
        X, O, O, O, O, O, O, X,
        X, O, O, O, O, O, O, X,
        X, O, O, O, O, O, O, X,
        X, O, O, X, X, O, O, X,
        X, O, O, X, X, O, O, X,
        X, O, O, X, X, O, O, X,
        X, O, O, X, X, O, O, X,
        X, X, X, X, X, X, X, X,
    ],
    'Thursday': [
        X, X, X, X, X, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, X, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
        O, O, X, O, O, X, O, X,
    ],
    'Friday': [
        X, X, X, X, X, O, O, O,
        X, O, O, O, O, O, O, O,
        X, O, O, O, O, O, O, O,
        X, X, X, O, O, O, O, O,
        X, O, O, O, O, O, O, O,
        X, O, O, O, O, O, O, O,
        X, O, O, O, O, O, O, O,
        X, O, O, O, O, O, O, O,
    ],
    'Saturday': [
        X, X, X, X, X, X, X, X,
        X, O, O, O, X, O, O, X,
        X, O, O, O, X, O, O, X,
        X, X, X, X, X, X, X, X,
        O, O, O, X, X, O, O, X,
        O, O, O, X, X, O, O, X,
        O, O, O, X, X, O, O, X,
        X, X, X, X, X, O, O, X,
    ],
    'Sunday': [
        X, X, X, X, X, O, O, X,
        X, O, O, O, X, O, O, X,
        X, O, O, O, X, O, O, X,
        X, X, X, X, X, O, O, X,
        O, O, O, X, X, O, O, X,
        O, O, O, X, X, O, O, X,
        O, O, O, X, X, O, O, X,
        X, X, X, X, X, X, X, X,
    ]
};

const drawScreen = () => {

    const dayOfWeek = moment().format('dddd');
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    //senseHat.Leds.setPixels(daysOfWeek[dayOfWeek]);
    senseHat.Leds.setPixels(daysOfWeek[DAYS[Math.floor(Math.random()*6)]]);

    setTimeout(function() {
        senseHat.Leds.clear([0, 0, 0]);
    }, 2500)

};

// Refresh the screen every 2 seconds
let daysInterval = setInterval(drawScreen, 5000);
const IMU = new imu.IMU();

senseHat.Joystick.getJoystick().then(joystick => {
    joystick.on("press", direction => {
        console.log("Joystick pressed in " + direction + " direction");
        switch (direction) {
            case 'right':
                clearInterval(daysInterval);
                senseHat.Leds.clear([0, 0, 0]);
                IMU.getValue((err, data) => {
                    if (err !== null) {
                        console.error("Could not read sensor data: ", err);
                        return;
                    }
                    console.log("Temperature is: ", Math.round(data.temperature));
                });
                sense.showLetter("B");
                break;
            case 'left':
                clearInterval(daysInterval);
                senseHat.Leds.clear([0, 0, 0]);
                IMU.getValue((err, data) => {
                    console.log("Humidity is: ", Math.round(data.humidity));
                });
                sense.showLetter("A");
                break;
            case 'click':
                daysInterval = setInterval(drawScreen, 5000);
                break;
        }
    });
});

