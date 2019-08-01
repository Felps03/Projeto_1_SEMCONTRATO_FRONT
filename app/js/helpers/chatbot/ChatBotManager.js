System.register(["../../models/Chat", "./chatBotTree", "../../utils/index", "./chatAnswerParser", "../../utils/promiser"], function (exports_1, context_1) {
    "use strict";
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
                                if (branch.normalize === undefined)
                                    branch.normalize = true;
                                if (branch.call) {
                                    for (let synonym of branch.call) {
                                        if (branch.normalize === undefined)
                                            branch.normalize = true;
                                        const processed = new RegExp(synonym).exec(branch.normalize ? normalizedMsg : lastMsg[1]);
                                        if (processed) {
                                            success = true;
                                            const msgs = await this.toBranch(branch, processed);
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
                                    if (typeof msg === 'string') {
                                        yield index_1.delay(this.message([
                                            Chat_1.ChatAgent.Bot,
                                            chatAnswerParser_1.parseState(this.state, msg)
                                        ]), this.DELAY_TIME);
                                    }
                                }
                            }
                        }
                        else {
                            let msgs = [];
                            msgs.push([Chat_1.ChatAgent.Bot, chatBotTree_1.mainBranch.greet]);
                            msgs.push(...await this.toBranch(chatBotTree_1.dialog[chatBotTree_1.mainBranch.goto], null));
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
                async toBranch(branch, match) {
                    console.log('>>', this.context);
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
                    const gotoOverride = this.state.get('_GOTO');
                    if (gotoOverride) {
                        this.context = gotoOverride;
                        this.state.delete('_GOTO');
                        this.store();
                    }
                    else if (branch.goto) {
                        this.context = branch.goto;
                        this.store();
                    }
                    const actualState = this.state;
                    if (this.context === chatBotTree_1.mainBranch.goto) {
                        this.state = new Map();
                    }
                    let promises = [];
                    let msgs = [];
                    const answersOverride = actualState.get('_ANSWER');
                    if (answersOverride && Array.isArray(answersOverride)) {
                        answersOverride.forEach(answer => {
                            msgs.push([Chat_1.ChatAgent.Bot, chatAnswerParser_1.parseState(actualState, answer)]);
                        });
                        this.state.delete('_ANSWER');
                    }
                    else {
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
                    }
                    const possibleGreet = chatBotTree_1.dialog[this.context].greet;
                    const possibleProcess = chatBotTree_1.dialog[this.context].process;
                    const possibleFlow = chatBotTree_1.dialog[this.context].flow;
                    if (possibleProcess) {
                        possibleProcess(this.state);
                    }
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
                async *clear() {
                    this.toBranch(chatBotTree_1.mainBranch, null);
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
