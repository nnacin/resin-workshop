const senseHat = require('node-sense-hat');
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
    senseHat.Leds.clear([127, 0, 0]);

    const dayOfWeek = moment().format('dddd');
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    senseHat.Leds.setPixels(daysOfWeek[dayOfWeek]);
    //senseHat.Leds.setPixels(daysOfWeek[DAYS[Math.floor(Math.random()*6)]]);

};

// Refresh the screen every 2 seconds
let daysInterval = setInterval(drawScreen, 2000);

senseHat.Joystick.getJoystick().then(joystick => {
    joystick.on("press", direction => {
        console.log("Joystick pressed in " + direction + " direction");
        switch (direction) {
            case 'right':
                console.log("RIGHT!")
                clearInterval(daysInterval);
                senseHat.Leds.clear([127, 0, 0]);
                senseHat.Imu.IMU().getValue((err, data) => {
                    console.log("Temperature is: ", data.temperature);
                });
                break;
            case 'left':
                clearInterval(daysInterval);
                senseHat.Leds.clear([127, 0, 0]);
                senseHat.Imu.IMU().getValue((err, data) => {
                    console.log("Humidity is: ", data.humidity);
                });
                break;
            case 'click':
                daysInterval = setInterval(drawScreen, 2000);
                break;
        }
    });
});
