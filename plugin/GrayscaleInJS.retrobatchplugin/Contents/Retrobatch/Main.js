module.exports = {
    
    
    inputKeys: ["inputRedBias", "inputGreenBias", "inputBlueBias"],
    
    attributes: {
        "inputRedBias": {
            displayName: "Red Bias",
            min: 0.00,
            sliderMin: 0.00,
            sliderMax: 1.00,
            default: .3,
            type: kCIAttributeTypeScalar,
            TSDisplayAsPercentage: true,
        },
        "inputGreenBias": {
            displayName: "Green Bias",
            min: 0.00,
            sliderMin: 0.00,
            sliderMax: 1.00,
            default: .59,
            type: kCIAttributeTypeScalar,
            TSDisplayAsPercentage: true,
        },
        "inputBlueBias": {
            displayName: "Blue Bias",
            min: 0.00,
            sliderMin: 0.00,
            sliderMax: 1.00,
            default: .11,
            type: kCIAttributeTypeScalar,
            TSDisplayAsPercentage: true,
        },
    },
    
    processAsset: function(document, rbnode, asset) {
        
        var redBias = rbnode.nodeValues().inputRedBias;
        var greenBias = rbnode.nodeValues().inputGreenBias;
        var blueBias = rbnode.nodeValues().inputBlueBias;
        
        // Uint8Array, Uint16Array, or Float32Array are valid values here.
        var imageAccumulator = asset.drawableImageAccumulatorOfTypedArrayType(Float32Array);
        var data = imageAccumulator.dataArray();
        
        var w = asset.imageWidth();
        var h = asset.imageHeight()
        var currentY = h - 1;
        var rowLength = data.length / h;
    
        
        while (currentY >= 0) {
            var currentX = 0;
            var idx = currentY * rowLength;
            
            while (currentX < w) {
                
                var r = data[idx];
                var g = data[idx + 1];
                var b = data[idx + 2];
                
                var avg = ((r * redBias) + (g * greenBias) + (b * blueBias));
                data[idx]     = avg; // red
                data[idx + 1] = avg; // green
                data[idx + 2] = avg; // blue
                
                idx += 4;
                currentX++;
            }
            
            currentY--;
        }
        
        
        return true;
    },
    
    
};



