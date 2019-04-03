module.exports = {
    
    inputKeys: ["inputQuality", "inputWriteToFolderURL"],
    
    attributes: {
        "inputQuality": {
            displayName: "Quality",
            min: 1.00,
            sliderMin: 1.00,
            sliderMax: 100.00,
            default: 80,
            type: kCIAttributeTypeScalar,
        },
        
        "inputWriteToFolderURL": {
            type: RBAttributeTypeFileURL,
            displayName: "Folder",
            allowedOpenPanelTypes: ["public.folder"],
        }
    },
    
    /*
    kCIAttributeDisplayName: 'CIAttributeDisplayName'
    kCIAttributeMin: 'CIAttributeMin'
    kCIAttributeSliderMin: 'CIAttributeSliderMin'
    kCIAttributeSliderMax: 'CIAttributeSliderMax'
    kCIAttributeDefault: 'CIAttributeDefault'
    kCIAttributeType: 'CIAttributeType'
    */
    
    
    processAsset: function(document, rbnode, asset) {
        
        
        var outputFolderURL = rbnode.nodeValues().inputWriteToFolderURL;
        if (!outputFolderURL) {
            console.log("No output folder set for WebP node.");
            return true;
        }
        
        var quality = rbnode.nodeValues().inputQuality + ""; // Convert it to a string.
        var resourcesURL = rbnode.resourcesFolderURL();
        var cwebpURL = resourcesURL.URLByAppendingPathComponent("cwebp");
        
        var imageURL = asset.writeToTemporaryURLWithUTI('public.png');
        var inputPath = imageURL.path();
        
        var outputURL = outputFolderURL.URLByAppendingPathComponent(asset.outputFileName().stringByDeletingPathExtension() + ".webp");
        var outputPath = outputURL.path();
        
        var task = NSTask.launchedTaskWithExecutableURL_arguments_error_terminationHandler(cwebpURL, ["-quiet", "-q", quality, inputPath, "-o", outputPath], null, null);
        task.waitUntilExit();
        
        // After we're done with our temp file, remove it.
        NSFileManager.defaultManager().removeItemAtURL_error(imageURL, null);
        return true;
    },
    
};



