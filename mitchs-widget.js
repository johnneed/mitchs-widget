window.MITCH = window.MITCH || {};
window.MITCH.mitchsWidget = function (data, clickFunc) {

    var template = "Area:{{area}}, " +
        "Factor:{{factor}}, " +
        "Product:{{product}}";

    var mitchsWidget = document.getElementById('mitchsWidget');

    function handleClick(id) {
        clickFunc(id);
    }

    function createButtons(data) {
        return data.reduce(function (buttons, analysis) {
            var title = template;
            var newButton = document.createElement("button");
            newButton.className = "mitchs-widget_analysis";
            newButton.onclick = handleClick.bind(null, analysis.id);

            Object.keys(analysis).forEach(function (key) {
                title = title.replace("{{" + key + "}}", analysis[key]);
            });
            title = title.replace(/{{.*?}}/g, "");
            newButton.title = title;
            newButton.innerHTML = "<span>" + analysis.name + "</span>";
            buttons.push(newButton);
            return buttons;
        }, []);
    }

    function renderButtons(buttons) {
        buttons.forEach(function (b) {
            mitchsWidget.appendChild(b);
        });
    }

    renderButtons(createButtons(data));
};