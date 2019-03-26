# Document API

The document object (usually passed via the processAsset function) is a subclass of [NSDocument](http://developer.apple.com/documentation/appkit/nsdocument). There are no Retrobatch specific APIs on this object, but all public APIs from NSDocument are available to you.

For example, if you wanted to know the location of a saved document (assuming it is saved!) you could use the following:

```javascript
 // fileURL returns an NSURL object or null if document is not saved.
function workflowStart(document, jsnode) {
    console.log(document.fileURL());
}
```