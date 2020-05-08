module.exports = {
    
    // This example shows how you can draw on top of an image.
    
    processAsset: function(document, rbnode, asset) {
        
        var maxRadius = 100;
        var dotCount = 50;
        var width = asset.imageWidth();
        var height = asset.imageHeight();
        
        var accumlator = asset.emptyImageAccumulator();
        accumlator.drawCIImage(asset.CIImage());
        accumlator.lockFocus();
        
        while (dotCount) {
            
            var radius = Math.ceil(Math.random() * maxRadius);
            var xLoc   = Math.ceil(Math.random() * width);
            var yLoc   = Math.ceil(Math.random() * height);
            
            var bounds = CGRectMake(xLoc - radius, yLoc - radius, radius * 2, radius * 2);
            
            var path = NSBezierPath.bezierPathWithOvalInRect(bounds)
            
            NSColor.colorWithRed_green_blue_alpha(Math.random(), Math.random(), Math.random(), Math.random()).set();
            
            path.fill();
            
            dotCount--;
        }
        
        accumlator.unlockFocus();

        asset.setCIImage(accumlator.CIImage())
        
        return true;
    },
    
};



