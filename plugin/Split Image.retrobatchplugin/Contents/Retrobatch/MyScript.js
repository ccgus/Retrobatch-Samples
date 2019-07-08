module.exports = {
    
    inputKeys: ["inputSplitWidth", "inputSplitHeight"],
    
    attributes: {
        "inputSplitWidth": {
            displayName: "Width",
            default: "200",
            
            // These two types are private, until I get a more public interface for defining a string.
            type: "OTAttributeTypeString",
            kOTInputKeyControllerClassName: "OTLineStringKeyController",
        },
        
        "inputSplitHeight": {
            displayName: "Height",
            default: "100",
            
            // These two types are private, until I get a more public interface for defining a string.
            type: "OTAttributeTypeString",
            kOTInputKeyControllerClassName: "OTLineStringKeyController",
        }
    },
    
    
    
    processAsset: function(document, rbnode, asset) {
        
        var targetWidth = parseInt(rbnode.nodeValues().inputSplitWidth);
        var targetHeight = parseInt(rbnode.nodeValues().inputSplitHeight);
        
        console.log("targetWidth: " + targetWidth)
        console.log("targetHeight: " + targetHeight)
        
        
        let baseCIImage = asset.CIImage();
        let baseWidth = baseCIImage.extent().size.width;
        let baseHeight = baseCIImage.extent().size.height;
        
        var currentY = 0;
        
        while (currentY < baseHeight) {
            var currentX = 0;
            while (currentX < baseWidth) {
                var rect = CGRectMake(currentX, currentY, targetWidth, targetHeight);
            
                var choppedAsset = asset.copy();
                var choppedImage = baseCIImage.imageByCroppingToRect(rect);
                choppedAsset.setCIImage(choppedImage)
                
                choppedAsset.setOutputFileName(currentX + "-" + currentY + " "+ asset.outputFileName())
                rbnode.continueWithAsset(choppedAsset);
            
                currentX += targetWidth;
            }
            
            currentY += targetHeight;
        }
        
        
        // Let's return false so our original image doesn't get processed.
        return false;
    },
    
};



