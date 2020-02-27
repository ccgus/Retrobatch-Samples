module.exports = {
    
    inputKeys: ["inputCopyCount"],
    
    attributes: {
        "inputCopyCount": {
            displayName: "Copies",
            min: 1.00,
            sliderMin: 1.00,
            sliderMax: 100.00,
            default: 10,
            type: kCIAttributeTypeScalar,
        }
    },
    
    processAsset: function(document, rbnode, asset) {
        
        for (i = 0; i < rbnode.nodeValues().inputCopyCount; i++) {
            rbnode.continueWithAsset(asset.copy());
        }
        
        // Don't process an extra node.
        return false;
    },
    
};



