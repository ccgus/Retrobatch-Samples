# Using Core Image Filters

Apple provides an image processing framework named [Core Image](https://developer.apple.com/documentation/coreimage?language=objc) which you can use from JavaScript to alter the apperance of your image. Using filters from the Core Image framework with Retrobatch is easy (and there are [hundreds of filters](https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html) to choose from).


## Comic Effects
Here's an example of one of the easiest filters to use, `CIComicEffect`:

```javascript
function processAsset(document, jsnode, asset) {
    
    // Grab a instance of CIImage out of our asset
    var image = asset.CIImage();
    
    // Create an instance of the CIComicEffect filter from Core Image
    var filter = CIFilter.filterWithName('CIComicEffect');
    
    // Tell the filter what image to use
    filter.inputImage = image;
    
    // Get the filtered image
    var comicImage = filter.outputImage();
    
    // Pass that filtered image back to our asset.
    asset.setCIImage(comicImage);
    
    return true;
}
```


## Motion Blur

Here is another example, where we perform different operations on the image as well as use a `CIMotionBlur` which takes multiple settings:

```javascript
function processAsset(document, jsnode, asset) {
    
    // Grab a CIImage from our asset
    var image = asset.CIImage();
    
    // "Clamp" the image, so when we do a motion blur next we don't get transparent edges.
    affineImage = image.imageByClampingToExtent();
    
    // Create a our motion blue instance
    var filter = CIFilter.filterWithName('CIMotionBlur');
    
    // Give it an image to work with
    filter.inputImage = affineImage;
    
    // The the radius of the blur. Larger numbers means a bigger "smear" in the blur.
    filter.inputRadius = 40;
    
    // set the angle of the blur as 45 degrees, but the filter needs it in radians so convert it to that format first.
    filter.inputAngle = -45 * (Math.PI/180);
    
    // get our blurred image
    var blurredImage = filter.outputImage();
    
    // Crop our filtered image to the size of the original image. Otherwise we'll get an image which is bigger than our original because the blur will continue outside the bounds of the original.
    blurredImage = blurredImage.imageByCroppingToRect(image.extent());
    
    // And finally, set the image on the asset.
    asset.setCIImage(blurredImage);
    
    return true;
}
```


## Convolution Kernel
And finally, here's an example which uses a convolution to create an embossing effect:


```javascript
function processAsset(document, jsnode, asset) {
        
    var m = `[1 0 -1
              2 0 -2
              1 0 -1]`;
    
    var image = asset.CIImage();

    var filter = CIFilter.filterWithName('CIConvolution3X3');

    filter.inputImage = image;
    filter.inputWeights = CIVector.vectorWithString(m);
    filter.inputBias = .5;
    var filteredImage = filter.outputImage();
    
    filteredImage = filteredImage.imageByCroppingToRect(image.extent());
    
    asset.setCIImage(filteredImage);

}

```