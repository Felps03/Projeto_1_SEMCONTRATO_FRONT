System.register(["../../models/Chat", "./chatBotTree"], function (exports_1, context_1) {
    "use strict";
    var Chat_1, chatBotTree_1, ChatBotManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            },
            function (chatBotTree_1_1) {
                chatBotTree_1 = chatBotTree_1_1;
            }
        ],
        execute: function () {
            ChatBotManager = class ChatBotManager {
                constructor() {
                    this.chat = new Chat_1.Chat();
                }
                init() {
                    this.getFromStorage();
                    if (this.chat.History.length === 0) {
                        this.message([this.toBranch(chatBotTree_1.mainBranch)]);
                    }
                    this.store();
                    return this.chat;
                }
                message(msgs) {
                    msgs.forEach((msg) => {
                        this.chat.add(msg);
                    });
                    this.store();
                    return this.chat;
                }
                answer() {
                    return new Promise((resolve, reject) => {
                        if (chatBotTree_1.dialog[this.context]) {
                            let success = false;
                            const lastMsg = this.chat.LastMsg;
                            const normalizedMsg = lastMsg ? lastMsg[1].toLocaleLowerCase() : '';
                            for (let branch of chatBotTree_1.dialog[this.context]) {
                                if (branch.call) {
                                    for (let synonym of branch.call) {
                                        if (normalizedMsg.indexOf(synonym) !== -1) {
                                            success = true;
                                            const possiblePre = this.toBranch(branch);
                                            setTimeout(() => {
                                                let msgs = [];
                                                msgs.push([Chat_1.ChatAgent.Bot, branch.answer]);
                                                if (possiblePre) {
                                                    msgs.push(possiblePre);
                                                }
                                                resolve(this.message(msgs));
                                            }, 500);
                                            break;
                                        }
                                    }
                                }
                            }
                            if (!success) {
                                setTimeout(() => {
                                    this.store();
                                    resolve(this.message([[Chat_1.ChatAgent.Bot, chatBotTree_1.dialog['understandnt'][0].answer]]));
                                }, 500);
                            }
                        }
                        else {
                            this.context = Object.getOwnPropertyNames(chatBotTree_1.dialog)[0];
                        }
                    });
                }
                store() {
                    localStorage.setItem('chatLog', JSON.stringify({
                        chat: this.chat,
                        context: this.context
                    }));
                }
                toBranch(branch) {
                    this.context = branch.goto;
                    this.store();
                    if (chatBotTree_1.dialog[this.context][0].pre) {
                        return [Chat_1.ChatAgent.Bot, chatBotTree_1.dialog[this.context][0].pre];
                    }
                }
                getFromStorage() {
                    const chatLog = JSON.parse(localStorage.getItem('chatLog'));
                    if (chatLog) {
                        this.chat = Chat_1.Chat.parse(chatLog.chat);
                        this.context = chatLog.context;
                    }
                }
                clear() {
                    this.toBranch(chatBotTree_1.mainBranch);
                    this.chat = new Chat_1.Chat();
                    this.store();
                    this.init();
                    return this.chat;
                }
                get Chat() {
                    return this.chat;
                }
            };
            exports_1("ChatBotManager", ChatBotManager);
        }
    };
});
