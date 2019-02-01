module.exports = {
    
    processAsset: function(document, rbnode, asset) {
        var url = asset.fileURL();
        
        var imgSrc = CGImageSourceCreateWithURL(url, null);
        
        if (imgSrc) {
            
            var thumb = CGImageSourceCreateThumbnailAtIndex(imgSrc, 0, {});
            
            if (thumb) {
                asset.setCGImage(thumb);
                return true;
            }
        }
        
        return false;
    },
    
};



