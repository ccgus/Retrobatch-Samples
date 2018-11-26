module.exports = {
    
    lastAsset: null,
    
    processAsset: function(document, rbnode, asset) {
        
        if (!this.lastAsset) {
            this.lastAsset = asset;
            return false;
        }
        
        if (this.lastAsset) {
        
            // Let's make a new big bitmap that will fit both of our images.            
            var firstImageWidth = this.lastAsset.imageSize().width;
            var width = firstImageWidth + asset.imageSize().width;
            var height = Math.max(this.lastAsset.imageSize().height, asset.imageSize().height);
            var acc = this.lastAsset.makeImageAccumulatorOfSize(CGSizeMake(width, height));
            
            // Let's draw our first image.
            acc.drawCIImage(this.lastAsset.CIImage());
            
            // And now we want to offset our second image by the width of the first
            var secondImage = asset.CIImage();
            secondImage = secondImage.imageByApplyingTransform(CGAffineTransformMakeTranslation(firstImageWidth, 0));
            
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



