module.exports = {
    
    
    inputKeys: [],
    
    attributes: {
        
    },
    
    processAsset: function(document, rbnode, asset) {
        
        
        var theFileName = asset.outputFileName().stringByDeletingPathExtension() + ""; // Convert it to a JS string.
        
        // This is not very fuzzy. File names in the format 'YYYY-MM-dd text here.jpeg'
        var theDate = theFileName.split(" ")[0];
        
        // console.log(theFileName + " theDate " + theDate)
        
        var formatter = NSDateFormatter.alloc().init();
        formatter.setDateFormat("YYYY-MM-dd")
        
        var dateObject = formatter.dateFromString(theDate);
        // console.log(dateObject)
        if (dateObject) {
            console.log("setting date on " + theFileName + " to " + dateObject)
            
            var exifStringFormat = "yyyy:MM:dd HH:mm:ss";
            
            var exifFormatter = NSDateFormatter.alloc().init();
            exifFormatter.setDateFormat(exifStringFormat)
            
            var exifStringDate = exifFormatter.stringFromDate(dateObject)
            
            asset.setImageMetaDataValue_forKey_inDictionary(exifStringDate, kCGImagePropertyIPTCDateCreated, kCGImagePropertyIPTCDictionary);
            asset.setImageMetaDataValue_forKey_inDictionary(exifStringDate, kCGImagePropertyIPTCTimeCreated, kCGImagePropertyIPTCDictionary);
            asset.setImageMetaDataValue_forKey_inDictionary(exifStringDate, kCGImagePropertyTIFFDateTime,    kCGImagePropertyTIFFDictionary);
            asset.setImageMetaDataValue_forKey_inDictionary(exifStringDate, kCGImagePropertyExifDateTimeDigitized,    kCGImagePropertyExifDictionary);
            asset.setImageMetaDataValue_forKey_inDictionary(exifStringDate, kCGImagePropertyExifDateTimeOriginal,    kCGImagePropertyExifDictionary);
        }
        else {
            console.log("Could not parse date from " + theDate + " / " + theFileName);
            console.log(theFileName.split(" "));
        }
        
        return true;
    },
    
};



