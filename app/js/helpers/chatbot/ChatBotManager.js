System.register(["../../models/Chat", "./chatBotTree", "../../utils/index", "./chatAnswerParser", "../../utils/promiser"], function (exports_1, context_1) {
    "use strict";
    var __asyncValues = (this && this.__asyncValues) || function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };
    var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
    var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };
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
    var Chat_1, chatBotTree_1, index_1, chatAnswerParser_1, promiser_1, ChatBotManager;
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
            },
            function (promiser_1_1) {
                promiser_1 = promiser_1_1;
            }
        ],
        execute: function () {
            ChatBotManager = class ChatBotManager {
                constructor(DELAY_TIME = 250) {
                    this.chat = new Chat_1.Chat();
                    this.state = new Map();
                    this.DELAY_TIME = DELAY_TIME;
                }
                init() {
                    return __asyncGenerator(this, arguments, function* init_1() {
                        this.getFromStorage();
                        if (this.chat.History.length === 0) {
                            console.log('init');
                            yield __await(yield* __asyncDelegator(__asyncValues(this.answer())));
                        }
                        else {
                            yield yield __await(this.chat);
                        }
                        this.store();
                    });
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
                            if (lastMsg) {
                                const normalizedMsg = lastMsg ? index_1.normalize(lastMsg[1]) : '';
                                for (let branch of chatBotTree_1.dialog[this.context].children) {
                                    if (branch.call) {
                                        for (let synonym of branch.call) {
                                            const processed = new RegExp(synonym).exec(normalizedMsg);
                                            if (processed) {
                                                success = true;
                                                const msgs = yield __await(this.toBranch(branch, processed));
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
                                    for (let msg of chatBotTree_1.dialog['understandnt'].children[0].answer) {
                                        if (typeof msg === 'string') {
                                            yield yield __await(index_1.delay(this.message([
                                                Chat_1.ChatAgent.Bot,
                                                chatAnswerParser_1.parseState(this.state, msg)
                                            ]), this.DELAY_TIME));
                                        }
                                    }
                                }
                            }
                            else {
                                let msgs = [];
                                msgs.push([Chat_1.ChatAgent.Bot, chatBotTree_1.mainBranch.greet]);
                                msgs.push(...yield __await(this.toBranch(chatBotTree_1.dialog[chatBotTree_1.mainBranch.goto], null)));
                                for (const msg of msgs) {
                                    yield yield __await(index_1.delay(this.message(msg), this.DELAY_TIME));
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
                        context: this.context,
                        state: [...this.state]
                    }));
                }
                async toBranch(branch, match) {
                    if (typeof branch === 'string') {
                        if (branch === chatBotTree_1.mainBranch.goto) {
                            this.state = new Map();
                        }
                        branch = chatBotTree_1.dialog[branch];
                        this.store();
                    }
                    if (branch.artificialDelay === undefined)
                        branch.artificialDelay = true;
                    if (branch.process) {
                        await branch.process(this.state, match);
                    }
                    const actualState = this.state;
                    if (branch.goto) {
                        this.context = branch.goto;
                        if (this.context === chatBotTree_1.mainBranch.goto) {
                            this.state = new Map();
                        }
                        this.store();
                    }
                    const possibleGreet = chatBotTree_1.dialog[this.context].greet;
                    const possibleProcess = chatBotTree_1.dialog[this.context].process;
                    const possibleFlow = chatBotTree_1.dialog[this.context].flow;
                    if (possibleProcess) {
                        possibleProcess(this.state);
                    }
                    let promises = [];
                    let msgs = [];
                    if (branch.answer) {
                        msgs = branch.answer.reduce((msgs, msg) => {
                            if (msg instanceof Function) {
                                const msgVal = promiser_1.promiser(msg(actualState));
                                promises.push(msgVal);
                            }
                            else
                                msgs.push([Chat_1.ChatAgent.Bot, chatAnswerParser_1.parseState(actualState, msg)]);
                            return msgs;
                        }, []);
                    }
                    await Promise.all(promises).then((ress) => {
                        ress.forEach(res => {
                            if (res)
                                msgs.push([Chat_1.ChatAgent.Bot, chatAnswerParser_1.parseState(actualState, res)]);
                        });
                    });
                    if (possibleGreet) {
                        possibleGreet.forEach(greet => {
                            msgs.push([
                                Chat_1.ChatAgent.Bot,
                                chatAnswerParser_1.parseState(actualState, greet)
                            ]);
                        });
                    }
                    if (possibleFlow) {
                        this.context = possibleFlow;
                        msgs.push(...await this.toBranch(possibleFlow, null));
                    }
                    return msgs;
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
                    return __asyncGenerator(this, arguments, function* clear_1() {
                        this.toBranch(chatBotTree_1.mainBranch, null);
                        this.chat = new Chat_1.Chat();
                        this.store();
                        this.init();
                        yield __await(yield* __asyncDelegator(__asyncValues(this.answer())));
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
