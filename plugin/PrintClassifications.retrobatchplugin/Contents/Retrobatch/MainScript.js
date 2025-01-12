module.exports = {
    
    inputKeys: ["inputWriteToFileURL"],
    
    jsonList: [],
    
    attributes: {
        "inputWriteToFileURL": {
            type: RBAttributeTypeFileURL,
            displayName: "File",
            allowedSavePanelTypes: ["public.json"]
        }
    },
    
    
    processAsset: function(document, rbnode, asset, context) {
        
        var name = asset.outputFileName();
        
        console.log(name + " ----------------");
        
        let ar = asset.topClassifications(10);
        
        ar.forEach(item => {
            console.log("    " + item.identifier + ": " + item.confidence);
        });
        
        this.jsonList.push({fileName: name, classifications: ar})
        
        return true;
    },
    
    workflowStart: function(document, rbnode, context) {
        this.jsonList = []
    },
    
    workflowEnd: function(document, rbnode, context) {
        
        var fileURL = rbnode.nodeValues().inputWriteToFileURL;
        
        if (!fileURL) {
            console.log("No folder URL given for Category write");
            return false;
        }
        
        var data = NSString.stringWithString(JSON.stringify(this.jsonList, null, 2)).dataUsingEncoding(NSUTF8StringEncoding);
        
        if (!data.writeToURL_atomically(fileURL, true)) {
            console.log("Could not write to " + fileURL);
            return false;
        }
        
        
    }
    
};



