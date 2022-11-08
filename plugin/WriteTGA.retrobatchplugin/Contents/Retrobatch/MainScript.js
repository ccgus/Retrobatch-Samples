module.exports = {
    
    
    inputKeys: ["inputWriteToFolderURL"],
    
    attributes: {
        "inputWriteToFolderURL": {
            type: RBAttributeTypeFileURL,
            displayName: "Folder",
            allowedOpenPanelTypes: ["public.folder"],
        }
    },
    
    processAsset: function(document, rbnode, asset) {
        
        var folderURL = rbnode.nodeValues().inputWriteToFolderURL;
        
        if (!folderURL) {
            console.log("No folder URL given for TGA write");
            return false;
        }
        
        var w = asset.imageWidth();
        var h = asset.imageHeight();
        
        var properties = {
            kCGImagePropertyTGADictionary: {
                kCGImagePropertyTGACompression: kCGImageTGACompressionRLE
            }
        }
        
        console.log(properties)
        
        var data = NSMutableData.data();
        var imageDestination = CGImageDestinationCreateWithData(data, "com.truevision.tga-image", 1, properties);
        
        if (!imageDestination) {
            console.log("Could not make image destination");
            return false;
        }
        
        
        CGImageDestinationAddImage(imageDestination, asset.CGImage(), {});
        var worked = CGImageDestinationFinalize(imageDestination);
        
        if (!worked) {
            console.log("Could not finalize TGA image destination");
            return false;
        }
        
        var name = asset.outputFileName();
        var fullURL = folderURL.URLByAppendingPathComponent(name + ".tga");
        if (!data.writeToURL_atomically(fullURL, true)) {
            console.log("Could not write to " + fullURL);
            return false;
        }
        
        return true;
    },
    
};



