# Using the JavaScript Node

Available in Retrobatch Pro 1.1 or later

**Note:** The JavaScript node is considered a preview currently, and might change a little in the future. We're hoping to get a few more things in here before calling it final, and we'd also like to hear back from people using it as well.

The JavaScript node allows you to run a JavaScript function when your workflow starts, each time an image is processed by the node, and at workflow end. Below are the function signatures of the three methods you can implement.

``` javascript
function workflowStart(document, jsnode) {

}

function preflightAsset(document, jsnode, asset) {
    return true;
}

function processAsset(document, jsnode, asset) {
    return true;
}

function workflowEnd(document, jsnode) {

}

```

As an example, if you want to reject any images that have a file name which starts with the number "1", you would implement the `processAsset` function as follows:
``` javascript
function processAsset(document, jsnode, asset) {
    
    if (asset.outputFileName().startsWith("1")) {
        return false;
    }
    
    return true;
}

```

Returning true from the `processAsset` function tells Retrobatch that the image passed in should go to the next node. If it returns false, then it effectively filters out the given image. If no value is returned, it's treated as true.

You can also use the `preflightAsset` function in a similar way, which will let the Retrobatch nodes know how many images to expect.

# JavaScript Cocoa Bridge

The JavaScript runtime Retrobatch uses allows you to also use any classes from Apple's Cocoa frameworks. This means you can mix together Core Image filters, download data from URLs, or any number of things.



# Examples

## Writing Classifications to a File.

If you have a workflow with a Classification node (available on MacOS 10.13 or later) prior to a JavaScript node, you can use the following example to write out all the generated classifications to a file.

```javascript
// Create a global variable to store our classifications in
var classifications = "";

function processAsset(document, jsnode, asset) {
    
    var s = asset.outputFileName() + ": " + asset.topClassification()
    
    // add to our global list of classifications
    classifications = classifications + "\n" + s
    
    // return true so that image continues to be processed through the workflow
    return true;
}


function workflowEnd(document, jsnode) {
    // Put it into a class we can write to with cocoa.
    var s = NSString.stringWithString(classifications)
    
    // Ask our node what the first write folder is.
    var outFolder = jsnode.firstWriteFolderPath();
    
    // Write it to disk!
    s.writeToFile_atomically(outFolder + "classifications.txt", true);
}
```




## Printing Out Useful Information About an Image:

```javascript
function processAsset(document, jsnode, asset) {
    
    console.log("\nInfo for " + asset.outputFileName());
    console.log("Bits per channel/component: " + asset.bitsPerComponent());
    console.log("Color model: " + asset.colorModel());
    console.log("Color profile name: " + asset.colorProfileName());
    console.log("DPI: " + asset.dpi());
    console.log("Path: " + asset.filePath());
    console.log("URL: " + asset.fileURL());
    console.log("Has alpha: " + asset.hasAlphaChannel());
    console.log("Width: " + asset.imageWidth());
    console.log("Height: " + asset.imageHeight());
    console.log("Megapixels: " + asset.imageMegaPixels());
    console.log("File type: " + asset.imageFileType());
    console.log("UTI: " + asset.uti());
    
    console.log("Retrobatch ID: " + asset.uniqueID());
    
    return true;
}
```

## Applying a Core Image Filter

For a list of available filters, visit Apple's [Core Image Filter Reference](https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html)

```javascript
function processAsset(document, jsnode, asset) {
    
    var center = CIVector.vectorWithX_Y_(asset.imageWidth() / 2, asset.imageHeight() / 2);
    
    var filterParams = {
        inputWidth: 5,
        inputSharpness: .5,
        inputCenter: center,
    }
    
    var image = asset.CIImage()
    image = image.imageByApplyingFilter_withInputParameters_("CICircularScreen", filterParams);
    asset.setCIImage(image);
    
    return true;
}
```

## Listing Meta Data
(Available in Retrobatch 1.1.1 and later)

```javascript
function processAsset(document, jsnode, asset) {
    
    // List all values and keys. asset.metaData() returns a dictionary.
    console.log(asset.metaData());
    
    // Or retrieve a specific metadata value.
    console.log(asset.metaValueForPropertyName_inMetaDictionaryName_("CopyrightNotice", "{IPTC}"));
    
    console.log(asset.metaValueForPropertyName_inMetaDictionaryName_("ColorModel", null));
    
    // Or set a value:
    asset.setMetaValue_forPropertyName_inMetaDictionaryName_("(c) Flying Meat Inc", "CopyrightNotice", "{IPTC}");
    
    
    return true;
}
```





