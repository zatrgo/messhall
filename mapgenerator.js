import { ds } from './heightmap.js';

const width = 500;
const height = width;


export function drawMap(canvas) {
    const data = ds({
        width: width,           // the width of the map, must be larger than 1.
        height: height,          // the height of the map, must be larger than 1.
        depth: 1000,          // [optional] the value of each pixel will be within 0~depth, default: 2000.
        rough: 10,             // [optional] effect the terrain variability (roughness), default: 1.
        randomizer(base, range) {
            // [optional] customize the logic of random height generation.
            // receive two number arguments:
            // first is the average of the four(or three) vertices of the square/diamomnd step.
            // second is half of the square/diamond width plus half of its height, you might want to use this value to decide how big the random value plus to the average is.
            // finally, return the height
            const random = Math.random() * Math.pow(2, -range / (100))
            return base + random
        }
    });
    const range = data.max - data.min
    const colorData = []
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const level = (data.data[j][i] - data.min) / range
            if (level > 0.8)        colorData.push(200, 230, 255, 255) // bright pale blue
            else if (level > 0.6)   colorData.push(160, 210, 240, 255)
            else if (level > 0.4)   colorData.push(120, 180, 220, 255)
            else if (level > 0.2)   colorData.push(80, 140, 190, 255)
            else                    colorData.push(40, 90, 140, 255)   // darkest blue
        }
    }
    canvas.putImageData(new ImageData(Uint8ClampedArray.from(colorData), width, height), 0, 0)
}