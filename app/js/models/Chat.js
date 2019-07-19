System.register([], function (exports_1, context_1) {
    "use strict";
    var ChatAgent, Chat;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (ChatAgent) {
                ChatAgent["User"] = "user";
                ChatAgent["Bot"] = "bot";
            })(ChatAgent || (ChatAgent = {}));
            exports_1("ChatAgent", ChatAgent);
            Chat = class Chat {
                constructor(history = []) {
                    this.history = history;
                }
                add(msg) {
                    this.history.push(msg);
                }
                get History() {
                    return this.history;
                }
                get LastMsg() {
                    return this.history[this.history.length - 1];
                }
                static parse(str) {
                    return new Chat(JSON.parse(str).history);
                }
            };
            exports_1("Chat", Chat);
        }
    };
});
