System.register([], function (exports_1, context_1) {
    "use strict";
    var button, options, link;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("button", button = (text) => `
    <button type="button" class="btn btn-primary btn-sm m-1" data-value="${text}">${text}</button>
`);
            exports_1("options", options = (content) => {
                let html = '\n<div class="chatbot-options d-flex flex-row mt-1">';
                content.forEach(option => {
                    html += button(option);
                });
                html += '</div>';
                return html;
            });
            exports_1("link", link = (text, href) => `
    <a href="${href}" target="_blank">${text}</a>
`);
        }
    };
});
