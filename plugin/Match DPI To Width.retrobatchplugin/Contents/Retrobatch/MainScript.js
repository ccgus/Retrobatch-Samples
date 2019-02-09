module.exports = {
    
    inputKeys: ["inputPrintingWidth", "inputUnitName"],
    
    attributes: {
        "inputPrintingWidth": {
            displayName: "Printing Width",
            min: 1.00,
            sliderMin: 1.00,
            sliderMax: 100.00,
            default: 10,
            type: kCIAttributeTypeScalar,
        },
        
        "inputUnitName": {
            displayName: "Unit",
            default: "Inches",
            type: "OTAttributeTypePopUp",
            inputKeyControllerValues: ["Inches", "Centimeters",],
            inputKeyControllerClassName: "OTPopUpInputKeyController",
        },
    },
    
    processAsset: function(document, rbnode, asset) {
        
        var desiredWidth  = rbnode.nodeValues().inputPrintingWidth;
        var unit          = rbnode.nodeValues().inputUnitName;
        var widthInPixels = asset.imageWidth();
        
        var newDPI = widthInPixels / desiredWidth;
        
        if (unit == "Centimeters") {
            newDPI = newDPI * 2.54;
        }
        
        asset.setDPI(newDPI);
        
        return true;
    },
    
};



