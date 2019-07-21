System.register(["../../models/Chat", "./chatBotTemplates", "./chatBotTree"], function (exports_1, context_1) {
    "use strict";
    var Chat_1, templates, chatBotTree_1, BOT_NAME, ChatBotManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            },
            function (templates_1) {
                templates = templates_1;
            },
            function (chatBotTree_1_1) {
                chatBotTree_1 = chatBotTree_1_1;
            }
        ],
        execute: function () {
            BOT_NAME = 'Teleckinho';
            ChatBotManager = class ChatBotManager {
                constructor() {
                    this.chat = new Chat_1.Chat();
                    this.context = Object.getOwnPropertyNames(chatBotTree_1.default)[0];
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
                        this.chat.add([Chat_1.ChatAgent.Bot, `${greeting}! Meu nome é ${BOT_NAME}, como posso ajudar? 🙂 ${templates.options({
                                'DailyNote': 'DailyNote',
                                'HelpCenter': 'HelpCenter',
                                'Login': 'Login'
                            })}`]);
                    }
                    else {
                        this.chat = Chat_1.Chat.parse(chatLog);
                    }
                    localStorage.setItem('chatLog', JSON.stringify(this.chat));
                    return this.chat;
                }
                message(msg) {
                    this.chat.add(msg);
                    localStorage.setItem('chatLog', JSON.stringify(this.chat));
                    return this.chat;
                }
                answer() {
                    return new Promise((resolve, reject) => {
                        if (chatBotTree_1.default[this.context]) {
                            let success = false;
                            const normalizedMsg = this.chat.LastMsg[1].toLocaleLowerCase();
                            chatBotTree_1.default[this.context].forEach(branch => {
                                if (branch.call) {
                                    branch.call.forEach(synonym => {
                                        if (normalizedMsg.indexOf(synonym) !== -1) {
                                            success = true;
                                            this.context = branch.goto;
                                            setTimeout(() => {
                                                localStorage.setItem('chatLog', JSON.stringify(this.chat));
                                                resolve(this.message([Chat_1.ChatAgent.Bot, branch.answer]));
                                            }, 500);
                                        }
                                    });
                                }
                            });
                            if (!success) {
                                resolve(this.message([Chat_1.ChatAgent.Bot, chatBotTree_1.default['undertandnt'][0].answer]));
                            }
                        }
                        else {
                            this.context = Object.getOwnPropertyNames(chatBotTree_1.default)[0];
                        }
                    });
                }
                get Chat() {
                    return this.chat;
                }
            };
            exports_1("ChatBotManager", ChatBotManager);
        }
    };
});
