System.register(["../../models/Chat", "./chatBotTree", "../../utils/index", "./chatAnswerParser"], function (exports_1, context_1) {
    "use strict";
    var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
    var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };
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
                constructor(DELAY_TIME = 300) {
                    this.chat = new Chat_1.Chat();
                    this.state = new Map();
                    this.DELAY_TIME = DELAY_TIME;
                }
                init() {
                    this.getFromStorage();
                    if (this.chat.History.length === 0) {
                        this.message([Chat_1.ChatAgent.Bot, this.toBranch(chatBotTree_1.mainBranch)]);
                    }
                    this.store();
                    return this.chat;
                }
                message(msg) {
                    this.chat.add(msg);
                    this.store();
                    return this.chat;
                }
                answer() {
                    return __asyncGenerator(this, arguments, function* answer_1() {
                        if (chatBotTree_1.dialog[this.context]) {
                            let success = false;
                            const lastMsg = this.chat.LastMsg;
                            const normalizedMsg = lastMsg ? index_1.normalize(lastMsg[1]) : '';
                            for (let branch of chatBotTree_1.dialog[this.context]) {
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
                                            const possiblePre = this.toBranch(branch);
                                            let msgs = branch.answer.map((msg) => [
                                                Chat_1.ChatAgent.Bot,
                                                chatAnswerParser_1.parseState(actualState, msg)
                                            ]);
                                            if (possiblePre) {
                                                msgs.push([
                                                    Chat_1.ChatAgent.Bot,
                                                    chatAnswerParser_1.parseState(actualState, possiblePre)
                                                ]);
                                            }
                                            for (const msg of msgs) {
                                                yield yield __await(index_1.delay(this.message(msg), branch.artificialDelay ? this.DELAY_TIME : 0));
                                            }
                                            return yield __await(void 0);
                                        }
                                    }
                                }
                            }
                            if (!success) {
                                this.store();
                                for (let msg of chatBotTree_1.dialog['understandnt'][0].answer) {
                                    yield yield __await(index_1.delay(this.message([
                                        Chat_1.ChatAgent.Bot,
                                        chatAnswerParser_1.parseState(this.state, msg)
                                    ]), this.DELAY_TIME));
                                }
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
