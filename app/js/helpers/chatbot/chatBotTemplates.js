System.register([], function (exports_1, context_1) {
    "use strict";
    var button, options;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("button", button = (text, value) => `
<button type="button" class="btn btn-primary btn-sm m-1" data-value="${value}">${text}</button>
`);
            exports_1("options", options = (content) => {
                let html = '\n<div class="chatbot-options d-flex flex-row mt-1">';
                for (const key in content) {
                    html += button(key, content[key]);
                }
                html += '</div>';
                return html;
            });
        }
    };
});
