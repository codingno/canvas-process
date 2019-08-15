# canvas process js

javascript canvas own library

## API

* [**createImage(_url_)**](#createimageurl "createImage") - return image html `<img>`
* [**createImageWithOutline(_url, width, height, outlineWidth_)**](#createImageWithOutline(_url,-width,-height,-outlineWidth_), "createImageWithOutline") - return image html already running drawOutline `<img>`
* [**drawImage(_image, width, height)**](#drawImage(_image,-width,-height_), "drawImage") - return image data canvas from image html `array[width*height*4]`
* [**defineNonTransparent(_imageData_)**](#defineNonTransparent(_imageData_), "defineNonTransparent") - return image data coordinate x and y canvas non transparent `array[x, y]`
* [**marchingSquare(_image, width, height)**](#marchingSquare(_image,-width,-height_), "marchingSquare") - return image html `<img>` and contour edge of image data canvas non transparent `array[width*height*4]`
* **drawOutline** _(return image html with outline)_

---

## SETUP

```javascript
const CanvasProcess = require('https://github.com/codingno/canvas-process/blob/master/canvas-process.js');
```

---

## createImage(_url_)

```javascript
const CanvasProcess = require('https://raw.githubusercontent.com/codingno/canvas-process/master/canvas-process.js');

let url = 'https://raw.githubusercontent.com/codingno/canvas-process/master/image.png';

CanvasProcess.createImage(url)
    .then(value => {
        console.log(value); // image html
    })
```

---

## createImageWithOutline(_url, width, height, outlineWidth_)

```javascript
const CanvasProcess = require('https://github.com/codingno/canvas-process/blob/master/canvas-process.js');

let url = 'https://raw.githubusercontent.com/codingno/canvas-process/master/image.png';

CanvasProcess.createWithOutline(url, 300, 300, 10)
    .then(value => {
        console.log(value.image); // imagedata canvas origin
        console.log(value.outline); // imagedata canvas with outline
        console.log(value.contour); // contour data marching square
    })
```

---

## drawImage(_image, width, height_)

```javascript
const CanvasProcess = require('https://github.com/codingno/canvas-process/blob/master/canvas-process.js');

let url = 'https://raw.githubusercontent.com/codingno/canvas-process/master/image.png';

CanvasProcess.createImage(url)
    .then(image => {
        CanvasProcess.drawImage(image, 300, 300)
            .then(value => {
                console.log(value) // image data canvas
            })
    })
```

---

## defineNonTransparent(_imageData_)

```javascript
const CanvasProcess = require('https://github.com/codingno/canvas-process/blob/master/canvas-process.js');

let url = 'https://raw.githubusercontent.com/codingno/canvas-process/master/image.png';

CanvasProcess.createImage(url)
    .then(image => {
        CanvasProcess.drawImage(image, 300, 300)
            .then(imageData => {
                CanvasProcess.defineNonTransparent(imageData)
                    .then( value => {
                        console.log(value) // coordinate x and y image data without transparent data
                    })
            })
    })
```

---

## marchingSquare(_image, width, height_)

```javascript
const CanvasProcess = require('https://raw.githubusercontent.com/codingno/canvas-process/master/canvas-process.js');

let url = 'https://raw.githubusercontent.com/codingno/canvas-process/master/image.png';

CanvasProcess.createImage(url)
    .then(image => {
        CanvasProcess.marchingSquare(image, 300, 300)
            .then(value => {
                console.log(value.image); // image html
                console.log(value.contour); // contour edge pixel of image data canvas
            })
    })
```

---

## drawOutline(_req, width, height, outlineStyle_)

value of parameter req is the javascript object that contain image html `<img>` and contour edge pixel `array[x, y]`. This value is return from [**marchingSquare**](#marchingSquare(_image,-width,-height_), "marchingSquare") method above.

value of parameter outlineStyle is the javascript object that contain color of background and color of line stroke (_hex style or html text color style in javascript string_), also width of line (_in pixel_).

```javascript
const CanvasProcess = require('https://raw.githubusercontent.com/codingno/canvas-process/master/canvas-process.js');

let url = 'https://raw.githubusercontent.com/codingno/canvas-process/master/image.png';

let outlineStyle = {
    background : "#FFFFFF",
    stroke : "#000",
    witdth : 10
}

CanvasProcess.createImage(url)
    .then(image => {
        CanvasProcess.marchingSquare(image, 300, 300)
            .then(res => {
                CanvasProcess.drawOutline(res, 300, 300, outlineStyle)
                    .then(value => {
                        console.log(value.image); // imagedata canvas origin
                        console.log(value.outline); // imagedata canvas with outline
                        console.log(value.contour); // contour data marching square
                    })
            })
    })
```
