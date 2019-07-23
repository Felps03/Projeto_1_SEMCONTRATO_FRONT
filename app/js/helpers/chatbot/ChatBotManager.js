System.register(["../../models/Chat", "./chatBotTree", "../../utils/normalizeTxt", "./chatAnswerParser"], function (exports_1, context_1) {
    "use strict";
    var Chat_1, chatBotTree_1, normalizeTxt_1, chatAnswerParser_1, ChatBotManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            },
            function (chatBotTree_1_1) {
                chatBotTree_1 = chatBotTree_1_1;
            },
            function (normalizeTxt_1_1) {
                normalizeTxt_1 = normalizeTxt_1_1;
            },
            function (chatAnswerParser_1_1) {
                chatAnswerParser_1 = chatAnswerParser_1_1;
            }
        ],
        execute: function () {
            ChatBotManager = class ChatBotManager {
                constructor() {
                    this.chat = new Chat_1.Chat();
                    this.state = new Map();
                }
                init() {
                    this.getFromStorage();
                    if (this.chat.History.length === 0) {
                        this.message([[Chat_1.ChatAgent.Bot, this.toBranch(chatBotTree_1.mainBranch)]]);
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
                            const normalizedMsg = lastMsg ? normalizeTxt_1.normalize(lastMsg[1]) : '';
                            for (let branch of chatBotTree_1.dialog[this.context]) {
                                if (branch.call) {
                                    for (let synonym of branch.call) {
                                        if (branch.normalize === undefined)
                                            branch.normalize = true;
                                        const processed = new RegExp(synonym).exec(branch.normalize ? normalizedMsg : lastMsg[1]);
                                        if (processed) {
                                            success = true;
                                            if (branch.process) {
                                                branch.process(this.state, processed);
                                            }
                                            const actualState = this.state;
                                            const possiblePre = this.toBranch(branch);
                                            setTimeout(() => {
                                                let msgs = [];
                                                msgs.push([
                                                    Chat_1.ChatAgent.Bot,
                                                    chatAnswerParser_1.parseState(actualState, branch.answer)
                                                ]);
                                                if (possiblePre) {
                                                    msgs.push([
                                                        Chat_1.ChatAgent.Bot,
                                                        chatAnswerParser_1.parseState(actualState, possiblePre)
                                                    ]);
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
                                    resolve(this.message([
                                        [
                                            Chat_1.ChatAgent.Bot,
                                            chatBotTree_1.dialog['understandnt'][0].answer
                                        ]
                                    ]));
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
                        context: this.context,
                        state: [...this.state]
                    }));
                }
                toBranch(branch) {
                    this.context = branch.goto;
                    if (this.context === chatBotTree_1.mainBranch.goto) {
                        this.state = new Map();
                    }
                    this.store();
                    if (chatBotTree_1.dialog[this.context][0].pre) {
                        return chatBotTree_1.dialog[this.context][0].pre;
                    }
                }
                getFromStorage() {
                    const chatLog = JSON.parse(localStorage.getItem('chatLog'));
                    if (chatLog) {
                        this.chat = Chat_1.Chat.parse(chatLog.chat);
                        this.context = chatLog.context;
                        this.state = new Map(chatLog.state);
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
