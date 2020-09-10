module.exports = {
    
    // This workflow requires Retrobatch Pro 1.4.3 or later
    workflowEnd: function(document, rbnode, context) {
        
        if (context && !context.isPreviewProcessing()) {
            NSAppleScript.alloc().initWithSource("quit").executeAndReturnError(null);
        }
        
    },
    
};



