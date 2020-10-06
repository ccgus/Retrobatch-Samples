module.exports = {
    
    
    workflowStart: function(document, rbnode) {
        
    },
    
    // processAsset is called for every image passed to this node. Return true to continue processing the, or false to not.
    // If you want to change pixels or crop or change metadata in an image, this is the place to do it.
    processAsset: function(document, rbnode, asset) {
        
        var ws = NSWorkspace.sharedWorkspace();
        var bundleid = asset.outputFileName().stringByDeletingPathExtension()
        var appPath = ws.absolutePathForAppBundleWithIdentifier(bundleid)
        
        if (appPath) {
            
            console.log("Setting " + appPath.lastPathComponent());
            //console.log("Setting icon for '" + bundleid + "' at '" + appPath + "'");
            
            var icon = NSImage.alloc().initWithCGImage_size(asset.CGImage(), NSZeroSize);
            
            ws.setIcon_forFile_options_(icon, appPath, 0);
        }
        else {
            console.log("Can't find application for bundleid '" + bundleid + "'");
        }
        
        return true;;
    },
    
};



