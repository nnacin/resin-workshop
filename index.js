// Using the standalone hw-specific library
const matrix = require('sense-hat-led');
// Using this library
const matrix = require('node-sense-hat').Leds;

const x = 3;
const y = 3;
const red = [255, 0, 0];

// Set a single pixel
matrix.setPixel(x, y, red);