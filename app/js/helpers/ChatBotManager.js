System.register(["../models/Chat", "./chatBotTemplates"], function (exports_1, context_1) {
    "use strict";
    var Chat_1, templates, ChatBotManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            },
            function (templates_1) {
                templates = templates_1;
            }
        ],
        execute: function () {
            ChatBotManager = class ChatBotManager {
                constructor() {
                    this.chat = new Chat_1.Chat();
                }
                init() {
                    const chatLog = localStorage.getItem('chatLog');
                    if (!chatLog) {
                        const actualHours = new Date().getHours();
                        let greeting;
                        if (actualHours >= 4 && actualHours < 12) {
                            greeting = 'Bom dia';
                        }
                        else if (actualHours < 20) {
                            greeting = 'Boa tarde';
                        }
                        else {
                            greeting = 'Boa noite';
                        }
                        this.chat.add([Chat_1.ChatAgent.Bot, `${greeting}! Meu nome é Teleckinho, como posso ajudar? 🙂 ${templates.options({
                                'DailyNote': 'DailyNote',
                                'HelpCenter': 'HelpCenter',
                                'Login': 'Login'
                            })}`]);
                    }
                    else {
                        this.chat = JSON.parse(chatLog);
                    }
                    localStorage.setItem('chatLog', JSON.stringify(this.chat));
                    return this.chat;
                }
                process(msg) {
                }
                get Chat() {
                    return this.chat;
                }
            };
            exports_1("ChatBotManager", ChatBotManager);
        }
    };
});
