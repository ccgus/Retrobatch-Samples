module.exports = {
    
    inputKeys: [],
    
    attributes: {},
    
    processAsset: function(document, rbnode, asset) {
            
        // inputURL and outputURL are private APIS and might change in a future release.
        var originalURL = asset.inputURL();
        var writtenURL  = asset.outputURL();
        
        if (originalURL && writtenURL) {
            var originalAtts = NSFileManager.defaultManager().attributesOfItemAtPath_error(originalURL.path(), null)
            if (originalAtts) {
                
                var newAtts = {}
                if (originalAtts['NSFileCreationDate']) {
                    newAtts['NSFileCreationDate'] = originalAtts['NSFileCreationDate'];
                }
                if (originalAtts['NSFileModificationDate']) {
                    newAtts['NSFileModificationDate'] = originalAtts['NSFileModificationDate'];
                }
                
                var set = NSFileManager.defaultManager().setAttributes_ofItemAtPath_error(newAtts, writtenURL.path(), null);
            }
        }
        
        return true;
    },
};



