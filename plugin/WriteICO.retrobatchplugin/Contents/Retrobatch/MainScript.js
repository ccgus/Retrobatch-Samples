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
            console.log("No URL given for ICO write");
            return false;
        }
        
        var validSizes = [16, 32, 48, 128, 256];
        
        var w = asset.imageWidth();
        var h = asset.imageHeight();
        
        // Is it square?
        if (w != h) {
            console.log("ICO files must be square");
            return false;
        }
        
        if (!validSizes.includes(w)) {
            console.log("Invalid size for ICO: " + w);
            return false;
        }
        
        var data = NSMutableData.data();
        var imageDestination = CGImageDestinationCreateWithData(data, "com.microsoft.ico", 1, null);
        
        if (!imageDestination) {
            console.log("Could not make image destination");
            return false;
        }
        
        
        CGImageDestinationAddImage(imageDestination, asset.CGImage(), {});
        var worked = CGImageDestinationFinalize(imageDestination);
        
        if (!worked) {
            console.log("Could not finalize ICO image destination");
            return false;
        }
        
        var name = asset.outputFileName();
        var fullURL = folderURL.URLByAppendingPathComponent(name + ".ico");
        if (!data.writeToURL_atomically(fullURL, true)) {
            console.log("Could not write to " + fullURL);
            return false;
        }
        
        return true;
    },
    
};



