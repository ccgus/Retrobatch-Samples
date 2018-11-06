module.exports = {
    
    // Input Keys must always start with 'input'
    inputKeys: ["inputRemoveLandscape"],
    
    attributes: {
        "inputRemoveLandscape": {
            displayName: "Remove Landscape",
            default: 1,
            type: RBAttributeTypeBoolean,
        }
    },
    
    checkImage(rbnode, asset) {
        
        var w = asset.imageWidth();
        var h = asset.imageHeight();
        var rejectLandscape = rbnode.nodeValues().inputRemoveLandscape;
        
        if (w == h) {
            return true; // Return true for all square images. It's both!
        }
        
        var isLandscape = w > h;
        
        if (rejectLandscape && isLandscape) {
            return false;
        }
        
        if (!rejectLandscape && !isLandscape) {
            return false;
        }
        
        return true;
    },
    
    preflightAsset: function(document, rbnode, asset) {
        return this.checkImage(rbnode, asset);
    },
    
    processAsset: function(document, rbnode, asset) {
        return this.checkImage(rbnode, asset);
    },
    
};



