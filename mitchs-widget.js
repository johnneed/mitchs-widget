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
            var clickFunction, buttonData, elementId, titleTemplate, parentElement, buttons = [];

            function handleClick(event) {
                var analysis;

                // Find the button with the data-id in our event.
                switch (true) {
                    // case  !!(event && event.path) : // Chrome
                    //     analysis = event.path.reduce(function (id, elem) {
                    //         return (elem.getAttribute && elem.getAttribute("data-id")) ? elem : null;
                    //     }, null);
                    //     break;
                    case !!(event && event.target) :// Firefox and IE Edge
                        if (event.target !== event.currentTarget) {
                            analysis = event.target || null;
                        }

                        break;
                    case !!(event && event.srcElement) :// Old IE
                        analysis = event.srcElement || null;
                        break;

                }
                event.stopPropagation();
                if (analysis !== null) {
                    buttons.forEach(function (button) {
                        button.className = button.className.replace("is-active-analysis-button", "").trim();
                    });
                    analysis.className += " is-active-analysis-button";
                    clickFunction(analysis);

                }

            }


            function createButtons(data) {
                var wrapper = document.createElement("div");
                wrapper.className = "mitchs-widget";

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
                    newButton.innerHTML = analysis.name;
                    wrapper.appendChild(newButton);
                    buttons.push(newButton);
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
                } catch (err) {
                    return false;
                }
            }


            /**
             * removes listeners and allows widget to be garbage collected.
             */
            function destroy() {
                parentElement.removeEventListener("click", handleClick);
                buttons = [];
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
            parentElement.addEventListener("click", handleClick, false);

            //Render buttons if we got data.
            render();


            return {
                render: render,
                destroy: destroy
            }

        }


        return {create: create};
    }
    ()
)
;
