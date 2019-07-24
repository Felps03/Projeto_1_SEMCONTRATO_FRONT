System.register(["../models/index", "../views/ChatBotView", "../helpers/chatbot/ChatBotManager"], function (exports_1, context_1) {
    "use strict";
    var __asyncValues = (this && this.__asyncValues) || function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };
    var index_1, ChatBotView_1, ChatBotManager_1, ChatBotController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (ChatBotView_1_1) {
                ChatBotView_1 = ChatBotView_1_1;
            },
            function (ChatBotManager_1_1) {
                ChatBotManager_1 = ChatBotManager_1_1;
            }
        ],
        execute: function () {
            ChatBotController = class ChatBotController {
                constructor() {
                    this.chatBotView = new ChatBotView_1.ChatBotView('#chatbot-view');
                    this.chatBotView.didMount((model) => {
                        document.getElementById('chatbot-clear').addEventListener('click', this.clear.bind(this));
                        Array.from(document.getElementById('chatbot-history').getElementsByTagName('button')).forEach(button => {
                            button.addEventListener('click', this.message.bind(this, new Event(''), [index_1.ChatAgent.User, button.getAttribute('data-value')]));
                        });
                        document.getElementById('chatbot-input-form').addEventListener('submit', this.message.bind(this));
                        this.messageInput = document.getElementById('chatbot-input-field');
                    });
                    this.chatBotManager = new ChatBotManager_1.ChatBotManager();
                    this.chatBotView.update(this.chatBotManager.init());
                }
                async message(event, msg) {
                    var e_1, _a;
                    event.preventDefault();
                    if (!msg) {
                        msg = [index_1.ChatAgent.User, this.messageInput.value];
                    }
                    this.chatBotView.update(this.chatBotManager.message(msg));
                    try {
                        for (var _b = __asyncValues(this.chatBotManager.answer()), _c; _c = await _b.next(), !_c.done;) {
                            const chat = _c.value;
                            this.chatBotView.update(chat);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                clear(event) {
                    event.preventDefault();
                    this.chatBotView.update(this.chatBotManager.clear());
                }
            };
            exports_1("ChatBotController", ChatBotController);
        }
    };
});
