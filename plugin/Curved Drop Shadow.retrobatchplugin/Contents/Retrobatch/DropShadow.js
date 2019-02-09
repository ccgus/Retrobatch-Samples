module.exports = {
    
    inputKeys: ["inputBorderWidth"],
    
    attributes: {
        "inputBorderWidth": {
            displayName: "Border Width",
            min: 1.00,
            sliderMin: 1.00,
            sliderMax: 100.00,
            default: 10,
            type: kCIAttributeTypeScalar,
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
        
        var xOffset = 5;
        var yOffset = 35;
        var curveHeight = 15;
        var imageYOffset = 10;
        var whiteBorderWidth = rbnode.nodeValues().inputBorderWidth;
        var doubleBorderWidth = whiteBorderWidth * 2;
        
        
        var baseImage = asset.CIImage();
        
        var w = asset.imageWidth() + doubleBorderWidth;
        var h = asset.imageHeight() + imageYOffset + doubleBorderWidth;
        
        var drawableContext = asset.emptyImageAccumulatorOfSize(CGSizeMake(w, h));
        
        drawableContext.lockFocus();
        {
            NSGraphicsContext.currentContext().saveGraphicsState();
            
            var shadow = NSShadow.new()
            shadow.setShadowColor(NSColor.blackColor().colorWithAlphaComponent(.6));
            
            var shadowOffset = NSMakeSize(0, -(yOffset + 5));
            shadow.setShadowOffset(shadowOffset);
            shadow.setShadowBlurRadius(5);
            shadow.set();
            
            
            // make a curved path, at the bottom of our image.
            bezierPath = NSBezierPath.bezierPath();
            
            bezierPath.moveToPoint(NSMakePoint(xOffset, 40 + yOffset));
            bezierPath.lineToPoint(NSMakePoint(w - (xOffset) + doubleBorderWidth, 40 + yOffset));
            bezierPath.lineToPoint(NSMakePoint(w - (xOffset) + doubleBorderWidth, 10 + yOffset));
            
            bezierPath.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(w / 2, curveHeight + yOffset),
                                                                NSMakePoint(w - (xOffset), 10 + yOffset),
                                                                NSMakePoint(w *.75, curveHeight + yOffset));
                      
            bezierPath.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(xOffset, 10 + yOffset),
                                                                NSMakePoint(w *.25, curveHeight + yOffset),
                                                                NSMakePoint(xOffset, 10 + yOffset));
            
            bezierPath.fill();
            // get rid of our shadow
            NSGraphicsContext.currentContext().restoreGraphicsState();
            
            // draw a white border
            NSColor.whiteColor().set();
            NSBezierPath.bezierPathWithRect(NSMakeRect(0, imageYOffset, w, h + whiteBorderWidth * 2)).fill();
            
            
            // draw our gray border around the white border
            NSColor.lightGrayColor().set();
            NSBezierPath.bezierPathWithRect(NSMakeRect(.5, imageYOffset + .5 , w - 1, (h - 1) + (whiteBorderWidth * 2))).stroke();
            
        }
        
        drawableContext.unlockFocus();
        
        baseImage = baseImage.imageByApplyingTransform(CGAffineTransformMakeTranslation(whiteBorderWidth, imageYOffset + whiteBorderWidth))
        
        var extent = baseImage.extent();
        
        drawableContext.setImage_dirtyRect(baseImage, extent);
        
        var newImage = drawableContext.image();
        
        asset.setCIImage(newImage);
        
        return true;
    },
    
    
    workflowEnd: function (document, rbnode) {
        console.log("workflowEnd");
    }
    
};



