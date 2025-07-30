import { ds } from './heightmap';
const data = ds({
  width: 500,           // the width of the map, must be larger than 1.
  height: 500,          // the height of the map, must be larger than 1.
  depth: 2000,          // [optional] the value of each pixel will be within 0~depth, default: 2000.
  rough: 1,             // [optional] effect the terrain variability (roughness), default: 1.
  randomizer(base, range) {
    // [optional] customize the logic of random height generation.
    // receive two number arguments:
    // first is the average of the four(or three) vertices of the square/diamomnd step.
    // second is half of the square/diamond width plus half of its height, you might want to use this value to decide how big the random value plus to the average is.
    // finally, return the height
    const random = Math.random() * Math.pow(2, -range / (129 * 2))
    return base + random
  }
});
console.log(data.data); // you would get a 2D-array of numbers
console.log(data.max);  // the maximum number in all pixels
console.log(data.min);  // the minimum number in all pixels

const range = max - min
const colorData = []
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    const level = (data[j][i] - min) / range
    if (level > 0.8) {
      colorData.push(186, 174, 154, 255)
    } else if (level > 0.6) {
      colorData.push(222, 214, 163, 255)
    } else if (level > 0.4) {
      colorData.push(209, 215, 171, 255)
    } else if (level > 0.2) {
      colorData.push(189, 204, 150, 255)
    } else {
      colorData.push(148, 191, 139, 255)
    }
  }
}

const imageData = new ImageData(
  Uint8ClampedArray.from(colorData),
  width,
  height,
);

function drawMap(canvas) {
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.putImageData(imageData, 0, 0)
}