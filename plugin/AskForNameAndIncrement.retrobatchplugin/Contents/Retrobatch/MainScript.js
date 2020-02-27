module.exports = {
    
    saveName: null,
    currentImageNumber: 1,
    
    promptForName: function() {
        
        var name = null;
        
        DispatchQueue.syncOnMain(function () { 
            
            var alert = NSAlert.new()
    
            alert.addButtonWithTitle("OK")
            alert.addButtonWithTitle("Cancel")
            alert.setMessageText("Output File Name:")
            alert.setInformativeText("What name would you like your file?");
            
            var txt = NSTextField.textFieldWithString("");
            txt.setFrame(NSMakeRect(0,0, 240, 24))
            alert.accessoryView = txt
            
            var response = alert.runModal();
            if (response == NSAlertFirstButtonReturn) {
                name = txt.stringValue();
            }
        });
  
        return name;
    },
    
    workflowStart: function(document, rbnode) {
        this.currentImageNumber = 1.0;
        this.saveName = this.promptForName();
    },
    
    // processAsset is called for every image passed to this node. Return true to continue processing the, or false to not.
    // If you want to change pixels or crop or change metadata in an image, this is the place to do it.
    processAsset: function(document, rbnode, asset) {
                
        if (this.saveName) {
            
            asset.setOutputFileName(this.saveName + "_" + this.currentImageNumber);
            this.currentImageNumber++;
            return true;
        }
        
        return false;
    },
    
};



