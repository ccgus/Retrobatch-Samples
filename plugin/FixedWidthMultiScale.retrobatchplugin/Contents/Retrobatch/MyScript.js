
module.exports = {
    
    inputKeys: ["inputTargetWidths"],
    
    attributes: {
        "inputTargetWidths": {
            displayName: "Widths",
            default: "100, 200, 300, 400",
            
            // These two types are private, until I get a more public interface for defining a string.
            type: "OTAttributeTypeString",
            kOTInputKeyControllerClassName: "OTLineStringKeyController",
        },
        
    },
    
    processAsset: function(document, rbnode, asset) {
        
        var widths = rbnode.nodeValues().inputTargetWidths;
        if (!widths) {
            console.log("No widths given");
            return false;
        }
        
        widthsArray = widths.split(",");
        
        for (idx = 0; idx < widthsArray.length; idx++) {
            w = widthsArray[idx];
            w = w.trim();
            
            var targetWidth = parseInt(w);
            if (targetWidth < 1) {
                console.log("Bad width given: " + targetWidth);
                return false;
            }
            
            var scale = targetWidth / asset.imageWidth();
            
            var image = asset.CIImage()
            image = image.imageByApplyingFilter_withInputParameters_("CILanczosScaleTransform", { inputScale: scale, });
            
            
            var targetHeight = asset.imageHeight() * scale;
            
            image = image.imageByCroppingToRect_(CGRectMake(0, 0, targetWidth, targetHeight))
            
            var scaledAsset = asset.copy();
            
            scaledAsset.setCIImage(image)
            
            // scaledAsset.setOutputFileName(w + " - " + asset.outputFileName())
            
            scaledAsset.setUserValue_forKey(w, "multiScaleValue"); // Store what we scaled for use in the write node $userValue.multiScaleValue$
            
            rbnode.continueWithAsset(scaledAsset);
            
        }
        
        
        return false; // Don't continue with the non-scaled image.
    },
    
};
