class CanvasProcess {
    
    createImage(url, width, height, outline) {
        return new Promise(resolve => {
            let image = new Image();
            image.onload = () => {
                this.marchingSquare(image, width, height)
                    .then( res => {
                        this.drawOutline(res, outline, width, height)
                            .then(res => {
                                resolve(res);
                            })
                    })
                // resolve(image);
            }

            image.src = url;
        });
    }

    drawImage(image, width, height) {
        return new Promise(resolve => {
            let canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            if(imageData) {
                resolve({image : image, imageData : imageData});
            }
        })
    }

    defineNonTransparent(imageData) {
        let result = [];
        for(let y = 0; y < imageData.height; y++) {
            for(let x = 0; x < imageData.width; x++) {
                const dot = (y*imageData.width+x)*4+3;
                const data = imageData.data[dot];
                if(data > 0) {
                    result.push([x, y]);
                }
            }
        }
        return result;
    }

    marchingSquare(image, width, height) {
        return new Promise(resolve => {          
            this.drawImage(image, width, height)
                .then(res => {
                    let imageData = res.imageData;
                    let nonTransparent = this.defineNonTransparent(res.imageData);
                    let startPoint = nonTransparent[0];
                    let x = startPoint[0];
                    let y = startPoint[1];
                    let dx, dy, pdx, pdy;
                    let contour_Dx = [0, 0, 1, 1, -1, 0, NaN, 1, 0, NaN, 0, 0, -1, 0, -1, -1];
                    let contour_Dy = [1, -1, 0, 0, 0, -1, NaN, 0, 1, NaN, 1, 1, 0, -1, 0, 0]; 
                    let contour = [];

                    function imageAlpha(x, y) {
                        let dot = (y*imageData.width+x)*4+3;
                        let data = imageData.data[dot];
                        return data;
                    }

                    function marchingDirection() {
                
                        let i = 0;
                        
                        if(imageAlpha(x-1, y-1)) i+=1;
                        if(imageAlpha(x, y-1)) i+=2;
                        if(imageAlpha(x-1, y)) i+=4;
                        if(imageAlpha(x, y)) i+=8;
                
                        if(i === 6) {
                            dx = pdy === 1 ? 1 : -1;
                            dy = 0;
                        }else if(i === 9) {
                            dy = pdx
                            dx = 0;
                        }else {
                            dx = contour_Dx[i];
                            dy = contour_Dy[i];
                        }
                
                        if(dx!== pdx || dy!== pdy) {
                            pdx = dx;
                            pdy = dy;   
                            contour.push([x,y]);
                        }
                        
                        x += dx;
                        y += dy;
                
                    }

                    do {
                        marchingDirection();
                    }while(x !== startPoint[0] || y !== startPoint[1])

                    resolve({image : image, contour : contour});

                })
        })
    }

    drawOutline(req, strokeWidth, width, height) {
        return new Promise(resolve => {
            let canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext('2d');
            let contour = req.contour;
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.strokeStyle = "blue";
            ctx.lineWidth = strokeWidth;
            ctx.moveTo(contour[0][0], contour[0][1]);

            for(let i = 0; i< contour.length; i++) {
            ctx.lineTo(contour[i][0], contour[i][1]);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.drawImage(req.image, 0, 0, canvas.width, canvas.height);
            let url = canvas.toDataURL();
            let image = new Image();
            image.onload = () => {
                resolve({image : req.image, outline : image, contour : contour});
            }
            image.src = url;            
        })
    }
    
}

export default new CanvasProcess();