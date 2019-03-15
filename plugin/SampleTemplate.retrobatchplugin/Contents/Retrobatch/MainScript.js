// This is a sample plugin that rejects any images who's file name doesn't start with a 1.

module.exports = {
    
    // workflowStart is called by Retrobatch before we start processing images.
    workflowStart: function(document, rbnode) {
        console.log("workflowStart");
    },

    // workflowEnd is called by Retrobatch when we are done processing images.
    workflowEnd: function(document, rbnode) {
        console.log("workflowEnd");
    },
    
    // This is our own function, that we use in both preflightAsset and processAsset so that we're not duplicating code.
    // It's just a quick check to see if a file's name starts with the number 1 or not.
    assetPassesTest: function (asset) {
        if (asset.outputFileName().startsWith("1")) {
            return true;
        }
        
        return false;   
    },
    
    // preflightAsset is called before the actuall processing. You can use this to filter out images, and the number of images processed is reflected on the node in the canvas. You can also use the function to gather any information you might use later in processAsset()
    preflightAsset: function (document, rbnode, asset) {
        return this.assetPassesTest(asset);
    },
    
    // processAsset is called for every image passed to this node. Return true to continue processing the, or false to not.
    // If you want to change pixels or crop or change metadata in an image, this is the place to do it.
    processAsset: function(document, rbnode, asset) {
        if (this.assetPassesTest(asset)) {
            
            // We can also draw on our image like so:
            asset.draw(function (context /*CGContextRef*/) {
                
                NSColor.blueColor().set();
                
                var path = NSBezierPath.bezierPathWithRect(asset.imageBounds())
                path.setLineWidth(30);
                path.stroke()
                
            });
            
            return true;
        }
        
        return false;
    },
    
};



