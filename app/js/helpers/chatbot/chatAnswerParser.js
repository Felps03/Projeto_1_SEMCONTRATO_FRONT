System.register(["./chatAnswerTemplates"], function (exports_1, context_1) {
    "use strict";
    var templates, TEMPLATES;
    var __moduleName = context_1 && context_1.id;
    function parseState(state, raw) {
        let response = raw;
        console.log(response);
        response = response
            .replace(/([^\\])\$(\w+)/, (match, p1, p2) => {
            console.log(match, p1, p2);
            console.log(state);
            console.log(p1 + state.get(p2));
            return p1 + state.get(p2);
        })
            .replace('\\$', '$');
        return response;
    }
    exports_1("parseState", parseState);
    function parseView(raw) {
        let response = raw;
        console.log('parseView ->', response);
        const matches = raw.match(/{{[^}}]*}}/g);
        if (!matches)
            return response;
        matches.forEach(match => {
            const call = match.replace(/^{{\s*/, '').replace(/\s*}}$/, '');
            const template = call.replace(/\s*\(.*\)/, '');
            if (TEMPLATES[template]) {
                const args = call
                    .replace(template, '')
                    .replace(/^\(/, '')
                    .replace(/\)$/, '')
                    .replace(/([^\\]),/g, '$1\u000B')
                    .split('\u000B')
                    .map(arg => arg.trim().replace('\\,', ','));
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
                link: templates.link
            };
        }
    };
});
