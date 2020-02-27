## Using JavaScript Expressions

*Available in Retrobatch Pro 1.3.2 or later.*

Retrobatch Pro now has the option to use a little snippet of JavaScript code to calculate values for nodes which allow you to set the size or length of a value (such as the width or height in the Crop node, or the x/y positions in the Gradient node). Let's say you wanted a border added to your image that was 1/16th of the average between the width and height of your image. You would then use the following snippet: `((w + h) / 2) / 16`

<center><img src="../images/javascript_expression_field_border_shot.png" width="457" style="border: solid 1px #777;" /></center>

This single line expression is run as if it was in a JavaScript function following this format:

    function runExpression(a, w, h) {
        return ((w + h) / 2) / 16;
    }


Three arguments are passed to the expression- 'w' for width, 'h' for height, and 'a' which is the asset object, where you can can get other values from (see the [JavaScript documentation for more information on the Asset API](https://flyingmeat.com/retrobatch/jsapi-1/assetapi/).

For our next example, we're going to use the Adjust Margins node. Let's say you have some images of varying sizes, which are all at 480 x 380 or smaller, and you want them to expand to meet that size. But- you only want it to grow evenly on either side of the image, but you want to keep a baseline so only transparent area is added to the top of the image, and the bottom stays in the same spot.

To do this, you would add an Adjust Margins node, with the following values:
<center><img src="../images/javascript_expression_fields_shot.png" width="444" style="border: solid 1px #777;" /></center>

### Complex Expressions

You'll notice that the expression field you type in doesn't have much room. If you have a more complex operation, you can add a JavaScript node before the node with your expression, and calculate your values in there. Then, once you have your value (in this case, 'x'), you can store it in a user defined variable on the asset, and in the JS Expression field, just return that pre-calculated value.

<center><img src="../images/javascript_expression_fields_complex_operation.png" width="641" style="border: solid 1px #777;" /></center>

