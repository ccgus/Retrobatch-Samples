
module.exports = {
    
    inputKeys: ["inputTargetWidth", "inputTargetHeight"],
    
    attributes: {
        "inputTargetWidth": {
            displayName: "Width",
            default: "228",
            
            // These two types are private, until I get a more public interface for defining a string.
            type: "OTAttributeTypeString",
            kOTInputKeyControllerClassName: "OTLineStringKeyController",
        },
        
        "inputTargetHeight": {
            displayName: "Height",
            default: "160",
            
            // These two types are private, until I get a more public interface for defining a string.
            type: "OTAttributeTypeString",
            kOTInputKeyControllerClassName: "OTLineStringKeyController",
        }
    },
    
    processAsset: function(document, rbnode, asset) {
        
        var targetWidth = parseInt(rbnode.nodeValues().inputTargetWidth);
        var targetHeight = parseInt(rbnode.nodeValues().inputTargetHeight);
        
        var ar = asset.imageWidth() / asset.imageHeight();
        var nr = targetWidth / targetHeight;
        
        var scale = 1;
        
        if (ar > nr) {
            scale = targetHeight / asset.imageHeight();
        }
        else {
            scale = targetWidth / asset.imageWidth();
        }
        
        var filterParams = {
            inputScale: scale,
        }
            
        var image = asset.CIImage()
        image = image.imageByApplyingFilter_withInputParameters_("CILanczosScaleTransform", filterParams);
        
        image = image.imageByCroppingToRect_(CGRectMake(0, 0, targetWidth, targetHeight))
        
        asset.setCIImage(image);
        
        return true;
    },
    
};
