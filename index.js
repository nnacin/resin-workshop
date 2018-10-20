const senseHat = require('node-sense-hat');
const imu = require("node-sense-hat").Imu;
const sense = require("sense-hat-led").sync;
const moment = require('moment');

const O = [0, 0, 0];
const X = [255, 0, 0];
const X2 = [0, 0, 255];


const numbers = {
    0: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
    ],
    1: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
    ],
    2: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, X2, O, O, O,
        O, O, O, O, X2, O, O, O,
        O, O, O, O, X2, O, O, O,
        O, O, O, O, X2, X2, X2, X2,
    ],
    3: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, X2, X2, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
    ],
    4: [
        O, O, O, O, X2, O, O, O,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
    ],
    5: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, X2, O, O, O,
        O, O, O, O, X2, O, O, O,
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
    ],
    6: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, X2, O, O, O,
        O, O, O, O, X2, O, O, O,
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
    ],
    7: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, X2, O,
        O, O, O, O, O, O, X2, O,
        O, O, O, O, O, X2, O, O,
        O, O, O, O, O, X2, O, O,
        O, O, O, O, X2, O, O, O,
    ],
    8: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
    ],
    9: [
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, O, O, O, X2,
        O, O, O, O, X2, X2, X2, X2,
    ],
};

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

const shiftRow = (arr, row) => {
    arr[row - 1].unshift(arr[row - 1].pop());
    return arr;
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
                    const temp = Math.round(data.temperature);
                    const R = temp % 10;
                    const Rdigit = numbers[R];

                    const L = Math.floor(temp / 10);
                    const Ldigit = shiftRow(numbers[L], 4);

                    senseHat.Leds.setPixels(Rdigit);
                    setTimeout(function() {
                        senseHat.Leds.setPixels(Ldigit);
                    }, 5000);


                    senseHat.Leds.setPixels(matrix);
                    console.log("Temperature is: ", Math.round(data.temperature));
                });
                break;
            case 'left':
                clearInterval(daysInterval);
                senseHat.Leds.clear([0, 0, 0]);
                IMU.getValue((err, data) => {
                    const humid = Math.round(data.humidity);
                    const R = humid % 10;
                    const L = Math.floor(humid / 10);

                    senseHat.Leds.setPixels(daysOfWeek[DAYS[Math.floor(Math.random()*6)]]);
                    console.log("Humidity is: ", Math.round(data.humidity));
                });
                break;
            case 'click':
                daysInterval = setInterval(drawScreen, 5000);
                break;
        }
    });
});

