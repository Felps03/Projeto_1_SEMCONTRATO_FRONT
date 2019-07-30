System.register(["../../models/Chat", "./chatBotTree", "../../utils/index", "./chatAnswerParser"], function (exports_1, context_1) {
    "use strict";
    var Chat_1, chatBotTree_1, index_1, chatAnswerParser_1, ChatBotManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            },
            function (chatBotTree_1_1) {
                chatBotTree_1 = chatBotTree_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (chatAnswerParser_1_1) {
                chatAnswerParser_1 = chatAnswerParser_1_1;
            }
        ],
        execute: function () {
            ChatBotManager = class ChatBotManager {
                constructor(DELAY_TIME = 250) {
                    this.chat = new Chat_1.Chat();
                    this.state = new Map();
                    this.DELAY_TIME = DELAY_TIME;
                }
                async *init() {
                    this.getFromStorage();
                    if (this.chat.History.length === 0) {
                        console.log('init');
                        yield* this.answer();
                    }
                    else {
                        yield this.chat;
                    }
                    this.store();
                }
                message(msg) {
                    this.chat.add(msg);
                    this.store();
                    return this.chat;
                }
                async *answer() {
                    if (chatBotTree_1.dialog[this.context]) {
                        let success = false;
                        const lastMsg = this.chat.LastMsg;
                        if (lastMsg) {
                            const normalizedMsg = lastMsg ? index_1.normalize(lastMsg[1]) : '';
                            for (let branch of chatBotTree_1.dialog[this.context].children) {
                                if (branch.call) {
                                    for (let synonym of branch.call) {
                                        const processed = new RegExp(synonym).exec(normalizedMsg);
                                        if (processed) {
                                            success = true;
                                            if (branch.artificialDelay === undefined)
                                                branch.artificialDelay = true;
                                            if (branch.process) {
                                                branch.process(this.state, processed);
                                            }
                                            const actualState = this.state;
                                            this.toBranch(branch);
                                            const possibleGreet = chatBotTree_1.dialog[this.context].greet;
                                            let msgs = branch.answer.map((msg) => [
                                                Chat_1.ChatAgent.Bot,
                                                chatAnswerParser_1.parseState(actualState, msg)
                                            ]);
                                            if (possibleGreet) {
                                                possibleGreet.forEach(greet => {
                                                    msgs.push([
                                                        Chat_1.ChatAgent.Bot,
                                                        chatAnswerParser_1.parseState(actualState, greet)
                                                    ]);
                                                });
                                            }
                                            for (const msg of msgs) {
                                                yield index_1.delay(this.message(msg), branch.artificialDelay ? this.DELAY_TIME : 0);
                                            }
                                            return;
                                        }
                                    }
                                }
                            }
                            if (!success) {
                                this.store();
                                for (let msg of chatBotTree_1.dialog['understandnt'].children[0].answer) {
                                    yield index_1.delay(this.message([
                                        Chat_1.ChatAgent.Bot,
                                        chatAnswerParser_1.parseState(this.state, msg)
                                    ]), this.DELAY_TIME);
                                }
                            }
                        }
                        else {
                            let msgs = [];
                            msgs.push([Chat_1.ChatAgent.Bot, chatBotTree_1.mainBranch.greet]);
                            this.toBranch(chatBotTree_1.mainBranch);
                            const possibleGreet = chatBotTree_1.dialog[this.context].greet;
                            if (possibleGreet) {
                                possibleGreet.forEach(greet => {
                                    msgs.push([Chat_1.ChatAgent.Bot, greet]);
                                });
                            }
                            for (const msg of msgs) {
                                yield index_1.delay(this.message(msg), this.DELAY_TIME);
                            }
                        }
                    }
                    else {
                        this.context = Object.getOwnPropertyNames(chatBotTree_1.dialog)[0];
                    }
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
                }
                getFromStorage() {
                    const chatLog = JSON.parse(localStorage.getItem('chatLog'));
                    if (chatLog) {
                        this.chat = Chat_1.Chat.parse(chatLog.chat);
                        this.context = chatLog.context;
                        this.state = new Map(chatLog.state);
                    }
                }
                async *clear() {
                    this.toBranch(chatBotTree_1.mainBranch);
                    this.chat = new Chat_1.Chat();
                    this.store();
                    this.init();
                    yield* this.answer();
                }
                get Chat() {
                    return this.chat;
                }
            };
            exports_1("ChatBotManager", ChatBotManager);
        }
    };
});
