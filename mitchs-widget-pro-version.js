window.MITCH = window.MITCH || {};
window.MITCH.mitchsWidget = (function () {


    var titleTemplate = "Area:{{area}}, " +
        "Factor:{{factor}}, " +
        "Product:{{product}}";



    function createButtons(data) {

        return data.map(function (buttons, analysis) {
            var title = template;
            var newButton = document.createElement("button");
            newButton.className = "mitchs-widget_analysis";
            newButton.attr

            Object.keys(analysis).forEach(function (key) {
                title = title.replace("{{" + key + "}}", analysis[key]);
            });
            title = title.replace(/{{.*?}}/g, "");
            newButton.title = title;
            newButton.innerHTML = "<span>" + analysis.name + "</span>";
            buttons.push(newButton);
            return buttons;
        });
    }

    function renderButtons(data) {
       var buttons = createButtons(data);
        buttons.forEach(function (b) {
            mitchsWidget.appendChild(b);
        });
    }

    /**
     * creates a new widget.
     * @param {object} initObject
     * initObject has this schema {elementId:string, clickFunction:function, [titleTemplate:string], [buttonData:object]}
     * @returns {object} new Widget
     */
    function create(initObject){
        var clickFunction, buttonData, elementId, titleTemplate, parentElement;
        function render(buttonData){
            //Swap new data if we have new, valid data
            this.buttonData = (typeof buttonData === "object" && buttonData) || this.buttonData;
            //Don't render if we don't have data
            if(!this.buttonData){
                return;
            }


        }
        function destroy(){}
        function handleClick(id) {
            clickFunction(id);
        }

        //sanity check
        if(typeof initObject !== "object" || typeof initObject.clickFunction !== "function" || typeof initObject.elementId !== "string"){
            throw Error("mitchsWidget requires initialization parameters elementId and clickFunction");
        }

        //Initialize our closure variables
        clickFunction = initObject.clickFunction;
        elementId = initObject.elementId;
        titleTemplate = initObject.titleTemplate || titleTemplate;
        buttonData = initObject.buttonData || {};
        parentElement = document.getElementById(elementId);

        //Check if we actually have DOM element to attach to.
        if(!parentElement){
            return undefined;
        }

        //Render buttons if we got data.
        render();



        return {
            render:render,
            destroy:destroy
        }

    }



    return {create:create};
}());
