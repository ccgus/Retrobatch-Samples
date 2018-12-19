
function removeExtension(filename){
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
}

module.exports = {
    
    inputKeys: ["inputFileNameFormat"],
    
    attributes: {
        "inputFileNameFormat": {
            displayName: "Format",
            default: "yyyyMMdd_hhmmss",
            
            // These two types are private, until I get a more public interface for defining a string.
            type: "OTAttributeTypeString",
            kOTInputKeyControllerClassName: "OTLineStringKeyController",
        }
    },
    
    lastAsset: null,
    
    processAsset: function(document, rbnode, asset) {
        
        // set the date / time metadata based on the filename.
        // An example expected filename would be "20181218_012026.png"
        // So,   yyyyMMdd_hhmmss
        
        // We're going to lean on NSDateFormatter here.
        
        
        var formatter  = NSDateFormatter.new();
        var dateFormat = rbnode.nodeValues().inputFileNameFormat;
        formatter.setDateFormat(dateFormat);
        
        var fileName = asset.outputFileName();
        fileName = removeExtension(fileName);
        
        var date = formatter.dateFromString(fileName);
        
        if (date) {
            
            // Now, convert that to a string.
            
            var mdFormatter = NSDateFormatter.new();
            mdFormatter.setDateFormat('yyyy:MM:dd HH:mm:ss');
            var s = mdFormatter.stringFromDate(date);
        
            asset.setMetaValue_forPropertyName_inMetaDictionaryName(s, 'DateTimeOriginal', '{Exif}');
            asset.setMetaValue_forPropertyName_inMetaDictionaryName(s, 'DateTimeDigitized', '{Exif}');
            asset.setMetaValue_forPropertyName_inMetaDictionaryName(s, 'DateTime', '{TIFF}');
        }
        
        

        return true;
    },
    
};



