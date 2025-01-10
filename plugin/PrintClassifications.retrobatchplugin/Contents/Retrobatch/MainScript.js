module.exports = {
    
    inputKeys: ["inputWriteToFileURL"],
    
    classifications: "",
    
    attributes: {
        "inputWriteToFileURL": {
            type: RBAttributeTypeFileURL,
            displayName: "File",
            allowedSavePanelTypes: ["public.plain-text"]
        }
    },
    
    
    processAsset: function(document, rbnode, asset, context) {
        
        var name = asset.outputFileName();
        
        this.classifications = this.classifications + name + ":\n"
        
        console.log(name + " ----------------");
        
        let ar = asset.topClassifications(10);
        
        ar.forEach(item => {
            console.log("    " + item.identifier + ": " + item.confidence);
            this.classifications = this.classifications + "    " + item.identifier + ": " + item.confidence + "\n";
        });
        
        return true;
    },
    
    workflowStart: function(document, rbnode, context) {
        this.classifications = ""
    },
    
    workflowEnd: function(document, rbnode, context) {
        
        var fileURL = rbnode.nodeValues().inputWriteToFileURL;
        
        if (!fileURL) {
            console.log("No folder URL given for Category write");
            return false;
        }
        
        var data = NSString.stringWithString(this.classifications).dataUsingEncoding(NSUTF8StringEncoding);
        
        if (!data.writeToURL_atomically(fileURL, true)) {
            console.log("Could not write to " + fileURL);
            return false;
        }
        
        
    }
    
};



