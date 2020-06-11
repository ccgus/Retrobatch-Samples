# Image Accumulator API

An image accumulator is an object you can get from an asset, which allows you to draw new images or shapes on. Here's an example taken from the "DrawDots" sample.

```javascript
// This example shows how you can draw on top of an image.

processAsset: function(document, rbnode, asset) {
    
    var maxRadius = 100;
    var dotCount = 50;
    var width = asset.imageWidth();
    var height = asset.imageWidth();
    
    var accumlator = asset.emptyImageAccumulator();
    accumlator.drawCIImage(asset.CIImage());
    accumlator.lockFocus();
    
    while (dotCount) {
        
        var radius = Math.ceil(Math.random() * maxRadius);
        var xLoc   = Math.ceil(Math.random() * width);
        var yLoc   = Math.ceil(Math.random() * height);
        
        var bounds = CGRectMake(xLoc - radius, yLoc - radius, radius * 2, radius * 2);
        
        var path = NSBezierPath.bezierPathWithOvalInRect(bounds)
        
        NSColor.colorWithRed_green_blue_alpha(Math.random(), Math.random(), Math.random(), Math.random()).set();
        
        path.fill();
        
        dotCount--;
    }
    
    accumlator.unlockFocus();

    asset.setCIImage(accumlator.CIImage())
    
    return true;
},
```


**extent()**  
Returns the extent of the accumulator as a CGRect.

Objective-C interface: `@property (readonly) CGRect extent;`

**drawCIImage()**  
Draw over the current image in an accumulator, using source over compositing.

Objective-C interface: `- (FMPLUGIN_API void)drawCIImage:(CIImage*)image;`  


**drawCIImage_withCompositeFilterNamed()**  
Draw over the current image in an accumulator, using the name of a Core Image compositing filter. Examples include CIColorBlendMode, CIColorBurnBlendMode, CIColorDodgeBlendMode, and CIDarkenBlendMode. A [complete list of compositing filters](https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/uid/TP30000136-SW71) can be found on Apple's website.

Objective-C interface: `- (FMPLUGIN_API void)drawCIImage:(CIImage*)image withCompositeFilterNamed:(NSString*)ciFilterName;`  


**setImage()**  
Replace the image in the accumulator with a new one.

Objective-C interface: `- (FMPLUGIN_API void)setImage:(CIImage *)im`

**setImage_dirtyRect()**  
Relace the image int he accumulator with a new one, but only for the bounds given in the dirtyRect.

Objective-C interface: `- (void)setImage:(CIImage *)im dirtyRect:(CGRect)r`


**lockFocus()**  
Lock focus on the accumulator, at which point all drawing using NS* apis (such as NSBezierPath and text drawing) will go to the accumulator. A call to `unlockFocus` is required when drawing is finished.

Objective-C interface: `- (FMPLUGIN_API void)lockFocus`  

**unlockFocus()**  
End NS drawing to the accumulator.

Objective-C interface: `- (FMPLUGIN_API void)unlockFocus`  

**imageDataAsTypedArray(arrayType)**  
Gain access to an accumulator's API as a JavaScript typed array. For example, you would use the following call to get a typed array as 8 bit components:  
`var data = imageAccumulator.imageDataAsTypedArray(Uint8Array);`


**bytesPerRow()**  
Returns the bytes per row for the image accumulator.


