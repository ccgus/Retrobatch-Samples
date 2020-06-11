# Pixel Access with JavaScript Types Arrays

Starting with version 1.4.2, Retrobatch has a new API for gaining access to an
images' pixels.

To do this, you must first call the `drawableImageAccumulator()` method on an
asset and assign the return value to a variable. And then you gain access to the
the pixels by using `imageDataAsTypedArray(Uint8Array)` on the image accumulator
variable. This returns a typed array with the pixel order as RGBA.

This example assumes that the image is a 8 bit per component image. If you are
processing 16 or 32 bpc, you'll need to take that into account. Keep in mind
that the width of a row of pixels may not equal the width of the image. Make 
sure to check with `bytesPerRow()` to find out that value.

You can download this plugin from the
[Sample JavaScript Plugins](https://flyingmeat.com/retrobatch/jsplugin/) page
for Retrobatch, named "Dither in JS".

```javascript
// This example shows does two things:
1) Takes an average of the pixels components and turns the image to grayscale.
2) Then uses a dithering algorithm against that.


processAsset: function(document, rbnode, asset) {
    
    var imageAccumulator = asset.drawableImageAccumulator();
    var data = imageAccumulator.imageDataAsTypedArray(Uint8Array);
    
    var w = asset.imageWidth();
    var h = asset.imageHeight()
    var bytesPerRow = imageAccumulator.bytesPerRow();
    
    // Here's an example for grayscale. We completely ignore bytesPerRow here
    // since it doesn't matter for grayscale.
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
        var currentIndex = currentY * bytesPerRow;
        
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

