# Asset API

An "asset" in Retrobatch terms is an image or PDF. It could represent bits written to disk, or maybe it was loaded over the Internet. It generally represents and image, and you can query information about it, as well as draw over it, read metadata information, or call any number of other methods.

Below are the public APIs available for plug-in authors when handling image assets.

**imageDataWithFormatOfUTI()**  
Returns a data object with a representation of the image in the passed format. If you'd like a JPEG, you'd pass 'public.jpeg'. 'public.png' for PNG, 'public.tiff' for TIFF.

Objective-C interface: `- (NSData*)imageDataWithFormatOfUTI:(NSString*)uti`  

```javascript
function processAsset(document, jsnode, asset) {
    // encode the image as a PNG and write that otu to /tmp/foo.png
    var data = asset.imageDataWithFormatOfUTI('public.png');
    data.writeToFile_atomically('/tmp/foo.png', true);
    
    return true;
}
```


**metaData()**  
Returns a dictionary object, which contains all the metadata keys in the image.

Objective-C interface: `- (NSDictionary*)metaData`

```javascript
// Return true or false if the image is a progressive JPEG or not.
function testForProgressiveJPEG(asset) {
    var md = asset.metaData();
    var jpegProperties = md[kCGImagePropertyJFIFDictionary]
    if (jpegProperties) {
        return md[kCGImagePropertyJFIFIsProgressive];
    }
    return false;
}
```



**metaValueForPropertyName_inMetaDictionaryName()**  
Get a specific key out of the metadata dictionary. The meta dictionary name is the name of the dictionary you want to pull the values from, such as kCGImagePropertyTIFFDictionary, kCGImagePropertyExifDictionary, or kCGImagePropertyIPTCDictionary. Visit [Apple's documentation](https://developer.apple.com/documentation/imageio/cgimageproperties?language=objc) for more information and the various keys you can use.

Objective-C interface: `- (id)metaValueForPropertyName:(NSString*)propName inMetaDictionaryName:(NSString*)dictName`  


**setMetaValue_forPropertyName_inMetaDictionaryName()**  
Set a specific value in the metadata dictionary. See metaValueForPropertyName_inMetaDictionaryName for information about the dictionary name.

Objective-C interface: `- (void)setMetaValue:(id)value forPropertyName:(NSString*)propName inMetaDictionaryName:(NSString*)dictName`  


**setUserValue_forKey()**  
Available in 1.1.1 or later.

Set a temporary value on the asset, which can be used in token fields (such as the watermark token) or later on in another plugin in the graph. The values set are only ever used when running a workflow, and are never saved.

As an example, let's say that you had a script or plugin that set a user value of "bar" on an asset with a key of "foo". You could then use the placeholder text `$userValue.foo$` in a watermark node to have the value for "bar" show up in the watermark. The values can be dynamically generated for your own purposes.

Objective-C interface: `- (void)setUserValue:(id)value forKey:(NSString*)key`  

**userValueForKey()**  

Available in 1.2 or later. Grabs a previously set user value out of an asset.

Objective-C interface: `- (FMPLUGIN_API id)userValueForKey:(NSString*)key`  

**userDictionary()**  
Available in 1.2 or later. Return all the user values in an asset as a dictionary.

Objective-C interface: `- (NSDictionary*)userDictionary;`  


**emptyImageAccumulator()**  
`- (OTImageAccumulator*)emptyImageAccumulator`

Returns an empty accumulator which you can draw CIImages to, or lock focus to for drawing in CoreGraphics or NSGraphics. Its size, color profile, and bit depth are set to match what the image you're calling it from are. See [OTImageAccumulator](#otimageaccumulator) for API calls.

**emptyImageAccumulatorOfSize()**  
Make an empty accumulator of a specific size.

Objective-C interface: `- (OTImageAccumulator*)emptyImageAccumulatorOfSize:(CGSize)s`

**imageWidth()**  
Returns the width of an asset. 

Objective-C interface: `- (NSInteger)imageWidth`


**imageHeight()**  
Returns the height of an asset.

Objective-C interface: `- (NSInteger)imageHeight`


**imageMegaPixels()**  
Returns the megapixels of the image. `(asset.imageWidth() * asset.imageHeight()) / 1000000.0;`

Objective-C interface: `- (CGFloat)imageMegaPixels`


**bitsPerComponent()**
Returns the size of each color / channel component in the image in bits.

Objective-C interface: `- (size_t)bitsPerComponent`


**hasAlphaChannel()**  
Returns a boolean value on wether or not the image has an alpha channel.

Objective-C interface: `- (BOOL)hasAlphaChannel`

**colorModel()**  
Returns a string with the color model of the image. For example, "RGB", "CMYK", "Lab", etc.

Objective-C interface: `- (NSString*)colorModel`

**- (void)setDPI:(size_t)newDPI**  
**- (size_t)dpi**  

**imageFileType()**  
Returns a string representing the file type of the image. For example "JPEG", "PNG", or "TIFF".

Objective-C interface: `- (NSString*)imageFileType`


**colorProfileName()**  
Returns a string with the name of the color profile the image uses. For example, "sRGB IEC61966-2.1".

Objective-C interface: `- (NSString*)colorProfileName`

**topClassification()**  
Returns a string generated from the machine learning Classification node, representing what the model things the image contains.

Objective-C interface: `- (NSString*)topClassification`

**topClassificationConfidence()**  
Returns a float between 0.0 and 1.0, giving the confidence from the Model for the top classification assigned.

Objective-C interface: `- (float)topClassificationConfidence`

**filePath()**  
The path to the file on disk, returned as a string.

Objective-C interface: `- (NSString*)filePath`

**fileURL()**  
The path to the file on disk, return as an NSURL object.

Objective-C interface: `- (NSURL*)fileURL`


**CGImage()**  
Return the image as a CGImageRef object.

Objective-C interface: `- (CGImageRef)CGImage`


**setCGImage()**  
Replace the current image with a CGImageRef.

Objective-C interface: `- (void)setCGImage:(CGImageRef)img`  


**CIImage()**  
Return the image as a CIImage object.

Objective-C interface: `- (nullable CIImage*)CIImage`


**setCIImage()**  
Replace the current image with a CIImage.

Objective-C interface: `- (void)setCIImage:(CIImage*)img`  


**outputFileName()**  
Return as a string, the name the asset will use when writing to disk.

Objective-C interface: `@property (nullable, strong) NSString *outputFileName`

