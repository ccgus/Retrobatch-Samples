module.exports = {
    
    
    processAsset: function(document, rbnode, asset) {
        
        var randomColor = function () {
            return NSColor.colorWithCalibratedRed_green_blue_alpha(Math.random(), Math.random(), Math.random(), Math.random());
        }
        
        var rv = function(s) {
            return Math.floor(Math.random()*s);
        }
        
        var acc = asset.emptyImageAccumulator();
        var size = acc.extent().size;
        
        acc.lockFocus();
        
        for (var i = 0; i < 5; i++) {
            var numberOfSegments = rv(8);
            
            var p = NSBezierPath.bezierPath();
            
            var sx = rv(size.width);
            var sy = rv(size.height);
            
            p.moveToPoint(NSMakePoint(rv(size.width), rv(size.height)));
            
            for (var j = 0; j < numberOfSegments; j++) {
                if (j % 2) {
                    p.lineToPoint(NSMakePoint(rv(size.width), rv(size.height)));
                }
                else {
                    p.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(rv(size.width), rv(size.height)),
                                                               NSMakePoint(rv(size.width), rv(size.height)),
                                                               NSMakePoint(rv(size.width), rv(size.height)));
                }
            }
            
            
            randomColor().set();
            if (i % 2) {
                
                p.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(rv(size.width), rv(size.height)),
                                                             NSMakePoint(rv(size.width), rv(size.height)),
                                                             NSMakePoint(sx, sy));
                p.closePath();
                p.fill();
            }
            else {
                p.setLineWidth(rv(10)+2);
                p.stroke();
            }
            
        }
        
        acc.unlockFocus();
        
        var newImage = acc.image();
        
        var hexFilter = CIFilter.filterWithName("CIHexagonalPixellate");
        hexFilter.inputImage = newImage;
        hexFilter.inputScale = 10;
        
        newImage = hexFilter.outputImage();
        
        
        var motionBlur = CIFilter.filterWithName('CIMotionBlur');
        motionBlur.inputImage = newImage;
        motionBlur.inputRadius = 20;
        motionBlur.inputAngle = -45 * (Math.PI/180);
        
        newImage = motionBlur.outputImage().imageByCroppingToRect(acc.extent());
        
        newImage = acc.image().imageByCompositingOverImage(newImage);
        
        newImage = newImage.imageByCompositingOverImage(asset.CIImage());
        
        asset.setCIImage(newImage);
        
        return true;
    },
    
    
};



