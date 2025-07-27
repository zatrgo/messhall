import { ds } from 'ds-heightmap'

const width = 400
const height = 300
const { data, max, min } = ds({
  width,
  height
})

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

const canvas = document.getElementById('mapCanvas')
canvas.width = width
canvas.height = height
const ctx = canvas.getContext('2d')
ctx.putImageData(imageData, 0, 0)