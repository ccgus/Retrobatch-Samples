# Pixel Access with JavaScript Types Arrays

Starting with version 1.4.2, Retrobatch has a new API for gaining access to an
images' pixels.

To do this, you must first call the `drawableImageAccumulatorOfTypedArrayType(typedArrayType)` method on an
asset. The values you can pass in to this method are `Uint8Array`, `Uint16Array`, or `Float32Array`. If you're unsure what value to pass, `Uint8Array` is probably what you're after. Here is an example:

```
var imageAccumulator = asset.drawableImageAccumulatorOfTypedArrayType(Uint8Array);
```

Next you'll want the typed array, and to do this you'll call the `dataArray()` method on your image accumulator like so:
```
var data = imageAccumulator.dataArray();
```

The `data` variable now has a reference to a typed array, with the pixel order as RGBA.

This example assumes that the image is a 8 bit per component image. If you are
processing 16 or 32 bpc, you'll need to take that into account. Keep in mind
that the width of a row of pixels may not equal the width of the image. Make 
sure to check with `bytesPerRow()` to find out that value.

You can download this plugin from the
[Sample JavaScript Plugins](https://flyingmeat.com/retrobatch/jsplugin/) page
for Retrobatch, named "Dither in JS".



```javascript

// This example shows does two things:
//1) Takes an average of the pixels components and turns the image to grayscale.
//2) Then uses a dithering algorithm against that.

    processAsset: function(document, rbnode, asset) {
        
        // Uint8Array, Uint16Array, or Float32Array are valid values here.
        var imageAccumulator = asset.drawableImageAccumulatorOfTypedArrayType(Uint8Array);
        var data = imageAccumulator.dataArray();
        
        var w = asset.imageWidth();
        var h = asset.imageHeight()
        var rowLength = data.length / h;
        
        // Here's an example for grayscale:
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i]     = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        
        var currentY = h - 1;
        
        while (currentY >= 0) {
            var currentX = 0;
            var err = 0;
            var currentIndex = currentY * rowLength;
            
            while (currentX < w) {
                
                var currentPixel = data[currentIndex];
                var checkPixel = currentPixel + err;
                
                if (checkPixel < 127) {
                    err = checkPixel;
                    data[currentIndex] = 0;
                    data[currentIndex+1] = 0;
                    data[currentIndex+2] = 0;
                }
                else {
                    err = checkPixel - 255;
                    data[currentIndex] = 255;
                    data[currentIndex+1] = 255;
                    data[currentIndex+2] = 255;
                }
                
                currentIndex += 4;
                currentX++;
            }
            
            currentY--;
        }
        
        return true;
    },

```

