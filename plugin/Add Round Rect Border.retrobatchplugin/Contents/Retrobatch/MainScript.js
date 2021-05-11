module.exports = {
    
    
    inputKeys: ["inputCornerRadius", "inputBorderColor"],
    
    attributes: {
        "inputCornerRadius": {
            displayName: "Radius",
            min: 0.00,
            sliderMin: 0.00,
            sliderMax: 100.00,
            default: 10,
            type: kCIAttributeTypeScalar,
        },
        
        "inputBorderColor": {
            displayName: "Color",
            default: CIColor.blackColor(),
            type: kCIAttributeTypeColor,
        }
    },
    
    
    processAsset: function(document, rbnode, asset) {
        
        var radius = rbnode.nodeValues().inputCornerRadius;
        var hRadius = radius / 2;
        var width = asset.imageWidth();
        var height = asset.imageHeight();
        
        var accumlator = asset.emptyImageAccumulator();
        accumlator.drawCIImage(asset.CIImage());
        accumlator.lockFocus();
        
        var bounds = CGRectMake(hRadius, hRadius, width - radius, height - radius);
        var path = NSBezierPath.bezierPathWithRoundedRect_xRadius_yRadius_(bounds, radius, radius);
        
        path.setLineWidth(radius);
        
        NSColor.colorWithCIColor(rbnode.nodeValues().inputBorderColor).set();
        
        path.stroke();
        
        accumlator.unlockFocus();

        asset.setCIImage(accumlator.CIImage())
        
        return true;
    },
    
};



