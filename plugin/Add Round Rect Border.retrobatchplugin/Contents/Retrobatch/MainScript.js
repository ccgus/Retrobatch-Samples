module.exports = {
    
    
    inputKeys: ["inputCornerRadius", "inputStrokeWidth", "inputBorderColor"],
    
    attributes: {
        "inputCornerRadius": {
            displayName: "Radius",
            min: 0.00,
            sliderMin: 0.00,
            sliderMax: 100.00,
            default: 10,
            type: kCIAttributeTypeScalar,
        },
        "inputStrokeWidth": {
            displayName: "Stroke Width",
            min: 0.00,
            sliderMin: 0.00,
            sliderMax: 100.00,
            default: 1,
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
        var strokeWidth = rbnode.nodeValues().inputStrokeWidth;
        var hstrokeWidth = strokeWidth / 2;
        var width = asset.imageWidth();
        var height = asset.imageHeight();
        
        var accumlator = asset.emptyImageAccumulator();
        accumlator.drawCIImage(asset.CIImage());
        accumlator.lockFocus();
        
        var bounds = CGRectMake(hstrokeWidth, hstrokeWidth, width - strokeWidth, height - strokeWidth);
        var path = NSBezierPath.bezierPathWithRoundedRect_xRadius_yRadius_(bounds, radius, radius);
        
        path.setLineWidth(strokeWidth);
        
        NSColor.colorWithCIColor(rbnode.nodeValues().inputBorderColor).set();
        
        path.stroke();
        
        accumlator.unlockFocus();

        asset.setCIImage(accumlator.CIImage())
        
        return true;
    },
    
};



