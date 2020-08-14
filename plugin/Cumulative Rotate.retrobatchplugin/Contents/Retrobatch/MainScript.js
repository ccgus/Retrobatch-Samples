module.exports = {
    
    inputKeys: ["inputRotateAmount"],
    
    attributes: {
        "inputRotateAmount": {
            displayName: "Rotate",
            min: 0.00,
            sliderMin: 0.00,
            sliderMax: 359.00,
            default: 8,
            type: kCIAttributeTypeScalar,
        }
    },
    
    amt: 0,
    
    workflowStart: function(document, rbnode) {
        this.amt = 0;
    },
    
    processAsset: function(document, rbnode, asset) {
        
        var img = asset.CIImage();
        var r = img.extent();
        var p = NSMakePoint(r.origin.x + (r.size.width / 2.0), r.origin.y + (r.size.height / 2.0));
        
            
        var radianAngle = this.amt * (Math.PI/180.0);
        img = img.imageByApplyingTransform(CGAffineTransformMakeTranslation(-p.x, -p.y));
        img = img.imageByApplyingTransform(CGAffineTransformMakeRotation(radianAngle));
        img = img.imageByApplyingTransform(CGAffineTransformMakeTranslation(Math.ceil(p.x), Math.ceil(p.y)));
            
        extent = img.extent();
        img = img.imageByApplyingTransform(CGAffineTransformMakeTranslation(-extent.origin.x, -extent.origin.y));
        asset.setCIImage(img);
            
        this.amt = this.amt + rbnode.nodeValues().inputRotateAmount;
            
        return true;
    },
    
};



