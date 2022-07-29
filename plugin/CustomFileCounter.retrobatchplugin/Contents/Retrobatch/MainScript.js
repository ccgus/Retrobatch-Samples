module.exports = {
    
    inputKeys: ["inputCountID"],
    
    
    attributes: {
        "inputCountID": {
            displayName: "Count ID",
            default: "MyID",
            
            // These two types are private, until I get a more public interface for defining a string.
            type: "OTAttributeTypeString",
            kOTInputKeyControllerClassName: "OTLineStringKeyController",
        }
    },
    
    workflowStart: function(document, rbnode) {
        this[rbnode.nodeValues().inputCountID] = 1.0;
        
    },
    
    // processAsset is called for every image passed to this node. Return true to continue processing the, or false to not.
    // If you want to change pixels or crop or change metadata in an image, this is the place to do it.
    processAsset: function(document, rbnode, asset) {
        
        var userValue = rbnode.nodeValues().inputCountID
            
        if (userValue) {
            
            var currentImageNumber = this[rbnode.nodeValues().inputCountID]
            
            asset.setUserValue_forKey(currentImageNumber + "" /*The user value needs to be a string for now*/, userValue);
            this[rbnode.nodeValues().inputCountID] = currentImageNumber + 1;
            return true;
        }
        
        return false;
    },
    
};



