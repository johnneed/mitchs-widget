# mitchs-widget
Mitch's Widget

## To Run:
Open mitches-widget.html in a browser.

## To Use:
load the script
<script src="mitchs-widget.js"></script>


## Create a new widget
  var newWidget =  MITCH.mitchsWidget.create({
            elementId: "mitchsWidget",
            clickFunction: getMoreInfo,
            titleTemplate:
            buttonData: data // optional
        });

####elementId :: string
The id the element you contain the new widget

####clickFunction :: function
The function you want called when a button is clicked.
the analysisID will be passed as a parameter to this function

####titleTemplate :: string - optional
A string representing what will be placed in each button's title attibute
surround key names encased in double braces will be replaced with their data values
keys that don't match the data will be removed.

this is the default title:
"Area:{{area}},  Factor:{{factor}},  Product:{{product}}"

#### buttonData :: Object - optional
An array of data objects with the following schema:

{
        name::string,
        id:string,
        area:string [optional],
        factor::string [optional],
        product::string  [optional],
    }


example :

[{
        name: "Analysis 3",
        id: "ABCD3",
        area: "Area 1",
        factor: "Factor 2",
        product: "Product 1"
  }, {
         name: "Analysis 3",
         id: "ABCD3",
         area: "Area 1",
         factor: "Factor 2",
         product: "Product 1"
}]

If data is provided the widget will render upon creation.


### Rendering
To render new buttons pass a new data object to the render method

var newData = [{
        name: "Analysis 44",
        id: "ABCD44",
        area: "Area 1",
        factor: "Factor 2",
        product: "Product 1"
   }, {
         name: "Analysis 55",
         id: "ABCD55",
         area: "Area 1",
         factor: "Factor 2",
         product: "Product 1"
   }];

newWidget.render(newData);

### Destroying
Before unloading the DOM element containing the widget,
you should first destroy the widget to avoid memory leaks,

newWidget.destroy();







