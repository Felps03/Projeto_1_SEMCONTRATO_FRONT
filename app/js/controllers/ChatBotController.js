System.register(["../models/index", "../views/ChatBotView", "../helpers/chatbot/ChatBotManager"], function (exports_1, context_1) {
    "use strict";
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
                    (async () => {
                        for await (const chat of this.chatBotManager.init()) {
                            this.chatBotView.update(chat);
                        }
                    })();
                }
                async message(event, msg) {
                    event.preventDefault();
                    if (!msg) {
                        msg = [index_1.ChatAgent.User, this.messageInput.value];
                    }
                    this.chatBotView.update(this.chatBotManager.message(msg));
                    for await (const chat of this.chatBotManager.answer()) {
                        this.chatBotView.update(chat);
                    }
                }
                async clear(event) {
                    event.preventDefault();
                    for await (const chat of this.chatBotManager.clear()) {
                        this.chatBotView.update(chat);
                    }
                }
            };
            exports_1("ChatBotController", ChatBotController);
        }
    };
});
