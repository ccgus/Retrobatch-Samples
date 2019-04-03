# Anatomy of a Plug-In

A Retrobatch plugin is a MacOS bundle, which is fancy name for a folder with a special icon. It contains a number of folders and subfolders with resource Retrobatch uses to execute the plug-in. Here's what the layout of the files look like on disk:

```
MyPlugin.retrobatch/
    Contents/
        manifest.json
        Resources/
        Retrobatch/
            MainScript.js
```

# Manifest

The manifest.json file lets Retrobatch know what you want to call your plugin, what the main entry point for code execution is, and a description of your plugin.

```
{
    "pluginName": "My Sample Plugin",
    "pluginCategory": "Sample Category",
    "description": "This plugin can be copied and modified to fit your needs.",
    "mainScript": "MainScript.js",
    "version": 1.0,
    "minimumRetrobatchVersion": "1.2.1",
    "minimumSystemVersion": "10.14.0"
}
```

**pluginName** is a string which will show up as the name of your plugin on Retrobatch's canvas and in the node list.

**pluginCategory** is an optional string which lets Retrobatch know which category to place the plug-in in. If not present, the generic "Plug-In" category will be used.

**description** is a string describing what your plug-in will do.

**mainScript** is the name of the file Retrobatch will use to to begin execution of your JavaScript.

**version** is the version number of your plug-in.

**minimumRetrobatchVersion** is the lowest Retrobatch version number that this plug-in requires. (Introduced in Retrobatch 1.2.1).

**minimumSystemVersion** is the lowest MacOS version number that this plug-in requires. (Introduced in Retrobatch 1.2.1).



# MainScript.js

The MainScript.js (or whatever you named it in the mainifest.js file) is the JavaScript file containing a module which has a number of functions Retrobatch will look for. Here's a sample:

``` javascript
// This is a sample plugin that rejects any images who's file name doesn't start with a 1.

module.exports = {
    
    // workflowStart is called by Retrobatch before we start processing images.
    workflowStart: function(document, rbnode) {
        console.log("workflowStart");
    },

    // workflowEnd is called by Retrobatch when we are done processing images.
    workflowEnd: function(document, rbnode) {
        console.log("workflowEnd");
    },
    
    /* This is our own function, that we use in both preflightAsset and
       processAsset so that we're not duplicating code.
       It's just a quick check to see if a file's name starts with the number 1
       or not. */
    assetPassesTest: function (asset) {
        if (asset.outputFileName().startsWith("1")) {
            return true;
        }
        
        return false;   
    },
    
    /* preflightAsset is called before the actuall processing. You can use
       this to filter out images, and the number of images processed is
       reflected on the node in the canvas. You can also use the function
       to gather any information you might use later in processAsset() */
    preflightAsset: function (document, rbnode, asset) {
        return this.assetPassesTest(asset);
    },
    
    /* processAsset is called for every image passed to this node. Return true
       to continue processing the, or false to not.
       If you want to change pixels or crop or change metadata in an image,
       this is the place to do it.*/
    processAsset: function(document, rbnode, asset) {
        if (this.assetPassesTest(asset)) {
            
            // We can also draw on our image like so:
            asset.draw(function (context /*CGContextRef*/) {
                
                NSColor.blueColor().set();
                
                var path = NSBezierPath.bezierPathWithRect(asset.imageBounds())
                path.setLineWidth(30);
                path.stroke()
                
            });
            
            return true;
        }
        
        return false;
    },
    
};


```