module.exports = {
    
    
    processAsset: function(document, rbnode, asset) {
        
        var imageAccumulator = asset.drawableImageAccumulator();
        var data = imageAccumulator.imageDataAsTypedArray(Uint8Array);
        
        var w = asset.imageWidth();
        var h = asset.imageHeight()
        var bytesPerRow = imageAccumulator.bytesPerRow();
        
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
    
    
};



