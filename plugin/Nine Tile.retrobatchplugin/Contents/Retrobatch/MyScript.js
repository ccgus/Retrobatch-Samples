module.exports = {
    
    processAsset: function(document, rbnode, asset) {
        
        let baseCIImage = asset.CIImage();
        let width = Math.floor(baseCIImage.extent().size.width) / 3.0;
        let height = Math.floor(baseCIImage.extent().size.height) / 3.0;
        
        let locations = {
            topLeft:   CGRectMake(0, height*2, width, height),
            topCenter: CGRectMake(width, height*2, width, height),
            topRight:  CGRectMake(width*2, height*2, width, height),
            
            middleLeft:   CGRectMake(0, height, width, height),
            middleCenter: CGRectMake(width, height, width, height),
            middleRight:  CGRectMake(width*2, height, width, height),
            
            bottomLeft:   CGRectMake(0, 0, width, height),
            bottomCenter: CGRectMake(width, 0, width, height),
            bottomRight:  CGRectMake(width*2, 0, width, height),
        }
        
        for (var location in locations) {
            
            var rect = locations[location];
            
            var choppedAsset = asset.copy();
            var choppedImage = baseCIImage.imageByCroppingToRect(rect);
            choppedAsset.setCIImage(choppedImage)
            
            choppedAsset.setOutputFileName(location + "-" + asset.outputFileName())
            rbnode.continueWithAsset(choppedAsset);
        }
        
        // Let's return false so our original image doesn't get processed.
        return false;
    },
    
};



