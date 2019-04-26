module.exports = {
    
    
    makeWebSafeName: function(badName) {
        // Replace anything that's not a letter or number to an underscore.
        return badName.replace(/[^a-z0-9\-]/gi, '_');
        
    },
    
    
    // preflightAsset is called before the actuall processing. You can use this to filter out images, and the number of images processed is reflected on the node in the canvas. You can also use the function to gather any information you might use later in processAsset()
    preflightAsset: function (document, rbnode, asset) {
        asset.setOutputFileName(this.makeWebSafeName(asset.outputFileName()));
        return true;
    },
    
    // processAsset is called for every image passed to this node. Return true to continue processing the, or false to not.
    // If you want to change pixels or crop or change metadata in an image, this is the place to do it.
    processAsset: function(document, rbnode, asset) {
        asset.setOutputFileName(this.makeWebSafeName(asset.outputFileName()));
        return true;
        
    },
    
};



