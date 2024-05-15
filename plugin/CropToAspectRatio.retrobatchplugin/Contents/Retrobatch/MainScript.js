
module.exports = {
    
    inputKeys: ["inputAspectRatio"],
    
    attributes: {
        "inputAspectRatio": {
            displayName: "Ratio",
            default: "2 x 3",
            
            // These two types are private, until I get a more public interface for defining a string.
            type: "OTAttributeTypeString",
            kOTInputKeyControllerClassName: "OTLineStringKeyController",
        },
        
    },
    
    
    
    // processAsset is called for every image passed to this node. Return true to continue processing the, or false to not.
    // If you want to change pixels or crop or change metadata in an image, this is the place to do it.
    processAsset: function(document, rbnode, asset) {
        
        var ar = rbnode.nodeValues().inputAspectRatio;
        
        if (ar == null) {
            console.log("Bad inputAspectRatio");
            return false;
        }
        
        arArray = ar.split("x");
        
        if (arArray.length < 2) {
            console.log("Invalid aspect ratio: " + ar)
            return false;
        }
        
        var w = parseFloat(arArray[0]);
        var h = parseFloat(arArray[1]);
        
        if (w < 0.001 || h < 0.001) {
            console.log("Either width or height for the aspect ratio is too small");
            return false;
        }
        
        
        var img = asset.CIImage();
        
        var imageExtent = img.extent();
        
        console.log("imageExtent: " + imageExtent)
        
        var widthRatio  = imageExtent.size.width / w;
        var heightRatio = imageExtent.size.height / h;
        
        console.log("widthRatio: " + widthRatio);
        console.log("heightRatio: " + heightRatio);
        
        var multiplier = widthRatio < heightRatio ? widthRatio : heightRatio;
        
        var newBounds = NSMakeRect(0, 0, Math.floor(w * multiplier), Math.floor(h * multiplier))
        
        newBounds.origin.x = Math.floor((imageExtent.size.width - newBounds.size.width) / 2);
        newBounds.origin.y = Math.floor((imageExtent.size.height - newBounds.size.height) / 2);
        
        if (newBounds.size.width > 0 && newBounds.size.height > 0) {
            
            img = img.imageByCroppingToRect(newBounds);
            
            img = img.imageByApplyingTransform(CGAffineTransformMakeTranslation(-newBounds.origin.x, -newBounds.origin.y));
            
            
            if (img != null) {
                asset.setCIImage(img);
            }
        }
        
        return true;
        
    },
    
};



