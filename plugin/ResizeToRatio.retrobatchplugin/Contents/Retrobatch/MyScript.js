
module.exports = {
    
    processAsset: function(document, rbnode, asset) {
        
        var targetWidth = 228;
        var targetHeight = 160;
        
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
