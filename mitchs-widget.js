window.MITCH = window.MITCH || {};
window.MITCH.mitchsWidget = (function () {


    var defaultTitleTemplate = "Area:{{area}}, " +
        "Factor:{{factor}}, " +
        "Product:{{product}}";

    /**
     * creates a new widget.
     * @param {object} initObject
     * initObject has this schema {elementId:string, clickFunction:function, [titleTemplate:string], [buttonData:object]}
     * @returns {object} mitchsWidget
     */
    function create(initObject) {
        var clickFunction, buttonData, elementId, titleTemplate, parentElement;

        function handleClick(event){
            var analysisId;
            event.preventDefault();
            console.log(event.target);
            // Find the button with the data-id in our event.
            switch(true){
                case  !!(event && event.path) : // Chrome
                    analysisId = event.path.reduce(function (id, elem) {
                        return id || elem.getAttribute("data-id");
                    }, null);
                    break;
                case !!(event && event.target) :// Firefox
                    analysisId =  event.target.getAttribute("data-id");
                    break;
                case !!(event && event.srcElement) :// Old IE
                    analysisId = event.srcELement.getAttribute("data-id");
                    if(!analysisId){
                        analysisId =event.srcElement.parentNode.getAttribute("data-id");
                    }
                    break;

            }
            if (analysisId !== null) {
                clickFunction(analysisId);
            }

        }


        function createButtons(data) {
            var wrapper = document.createElement("div");
            wrapper.className="mitchs-widget";

            //Add buttons to our wrapper
            data.forEach(function (analysis) {
                var title = titleTemplate;
                var newButton = document.createElement("button");
                newButton.className = "mitchs-widget_analysis";
                newButton.setAttribute("data-id", analysis.id);
                Object.keys(analysis).forEach(function (key) {
                    title = title.replace("{{" + key + "}}", analysis[key]);
                });
                title = title.replace(/{{.*?}}/g, "");
                newButton.title = title;
                newButton.innerHTML = "<span>" + analysis.name + "</span>";
                wrapper.appendChild(newButton);
            });


            return wrapper;
        }

        /**
         *
         * @param {object} [newButtonData] - array of analysis data.
         * @returns {boolean}
         */
        function render(newButtonData) {
            //Swap new data if we have new, valid data - otherwise we'll re-render the old data.
            buttonData = (typeof newButtonData === "object" && newButtonData) || buttonData;
            //Don't render if we don't have data
            if (!buttonData) {
                return false;
            }
            try {
                parentElement.innerHTML = "";
                parentElement.appendChild(createButtons(buttonData));
                return true;
            } catch(err){
                return false;
            }
        }


        /**
         * removes listeners and allows widget to be garbage collected.
         */
        function destroy() {
            parentElement.removeEventListener("click", handleClick);
            parentElement.innerHTML = "";
        }



        //sanity check
        if (typeof initObject !== "object" || typeof initObject.clickFunction !== "function" || typeof initObject.elementId !== "string") {
            throw Error("mitchsWidget requires initialization parameters elementId and clickFunction");
        }

        //Initialize our closure variables
        clickFunction = initObject.clickFunction;
        elementId = initObject.elementId;
        titleTemplate = initObject.titleTemplate || defaultTitleTemplate;
        buttonData = initObject.buttonData || {};
        parentElement = document.getElementById(elementId);

        //Check if we actually have DOM element to attach to.
        if (!parentElement) {
            return undefined;
        }
        //attach clickFunction
        parentElement.addEventListener("click", handleClick);

        //Render buttons if we got data.
        render();


        return {
            render: render,
            destroy: destroy
        }

    }


    return {create: create};
}());
