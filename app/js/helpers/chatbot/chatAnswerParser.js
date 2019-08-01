System.register(["./chatAnswerTemplates"], function (exports_1, context_1) {
    "use strict";
    var templates, TEMPLATES;
    var __moduleName = context_1 && context_1.id;
    function parseState(state, raw) {
        let response = raw;
        response = response
            .replace(/([^\\])\$(\w+)/g, (match, p1, p2) => {
            const stateItem = state.get(p2);
            return p1 + (typeof stateItem === 'string' ? stateItem : JSON.stringify(stateItem).replace(/,/g, '\\,'));
        })
            .replace(/\\$/g, '$');
        return response;
    }
    exports_1("parseState", parseState);
    function parseView(raw) {
        let response = raw;
        const matches = raw.match(/{{(.*?)}}/g);
        if (!matches)
            return response;
        matches.forEach(match => {
            const call = /{{(.*?)}}/.exec(match)[1];
            const template = call.replace(/\s*\(.*\)/, '');
            if (TEMPLATES[template]) {
                const args = /\((.*)\)/.exec(call.replace(template, ''))[1]
                    .replace(/([^\\]),/g, '$1\u000B')
                    .split('\u000B')
                    .map(arg => arg.trim().replace(/\\,/g, ','));
                response = response.replace(match, TEMPLATES[template](...args));
            }
        });
        return response;
    }
    exports_1("parseView", parseView);
    return {
        setters: [
            function (templates_1) {
                templates = templates_1;
            }
        ],
        execute: function () {
            TEMPLATES = {
                button: templates.button,
                options: templates.options,
                link: templates.link,
                placeholder: templates.placeholder,
                helpView: templates.helpView
            };
        }
    };
});
