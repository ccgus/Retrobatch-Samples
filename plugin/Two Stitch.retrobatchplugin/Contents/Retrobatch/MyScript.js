module.exports = {
    
    lastAsset: null,
    
    // Input Keys must always start with 'input'
    inputKeys: ["inputStitchVertical"],
    
    attributes: {
        "inputStitchVertical": {
            displayName: "Stitch Vertical",
            default: 1,
            type: RBAttributeTypeBoolean,
        }
    },
    
    processAsset: function(document, rbnode, asset) {
        
        if (!this.lastAsset) {
            this.lastAsset = asset;
            return false;
        }
        
        if (this.lastAsset) {
            var inputStitchVertical = rbnode.nodeValues().inputStitchVertical;
            var lastSize = this.lastAsset.imageSize();
            var thisSize = asset.imageSize();
            var acc = null;
            
 
            var secondImage = asset.CIImage();
            
            if (inputStitchVertical) {
                // Let's make a new big bitmap that will fit both of our images.            
                var firstImageHeight = lastSize.height;
                var height           = firstImageHeight + thisSize.height;
                var width            = Math.max(lastSize.width, thisSize.width);
                acc                  = this.lastAsset.emptyImageAccumulatorOfSize(CGSizeMake(width, height));
                secondImage          = secondImage.imageByApplyingTransform(CGAffineTransformMakeTranslation(0, firstImageHeight));
            }
            else {
                // Let's make a new big bitmap that will fit both of our images.            
                var firstImageWidth = lastSize.width;
                var width           = firstImageWidth + thisSize.width;
                var height          = Math.max(lastSize.height, thisSize.height);
                acc                 = this.lastAsset.emptyImageAccumulatorOfSize(CGSizeMake(width, height));
                secondImage         = secondImage.imageByApplyingTransform(CGAffineTransformMakeTranslation(firstImageWidth, 0));
            }
            
            // Let's draw our first image.
            acc.drawCIImage(this.lastAsset.CIImage());
            
            // And then draw that on our image accumulator as well.
            acc.drawCIImage(secondImage);
            
            // Let our asset know we've got a new image for it to use.
            asset.setCIImage(acc.image());
            
            // And set the last asset to null, so we don't use it again.
            this.lastAsset = null;
            return true;
        }
        
        return false;
    },
    
};



