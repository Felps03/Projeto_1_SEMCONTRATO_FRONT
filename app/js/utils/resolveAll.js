System.register(["./promiser", "../models/Chat", "../helpers/chatbot/chatAnswerParser"], function (exports_1, context_1) {
    "use strict";
    var promiser_1, Chat_1, chatAnswerParser_1;
    var __moduleName = context_1 && context_1.id;
    async function resolveAll(all, state) {
        let msgs = [];
        let promises = [];
        if (all) {
            msgs = all.reduce((msgs, msg) => {
                if (msg instanceof Function) {
                    const msgVal = promiser_1.promiser(msg(state));
                    promises.push(msgVal);
                }
                else
                    msgs.push([Chat_1.ChatAgent.Bot, chatAnswerParser_1.parseState(state, msg)]);
                return msgs;
            }, []);
        }
        await Promise.all(promises).then((ress) => {
            ress.forEach(res => {
                if (res)
                    msgs.push([Chat_1.ChatAgent.Bot, chatAnswerParser_1.parseState(state, res)]);
            });
        });
        return msgs;
    }
    exports_1("resolveAll", resolveAll);
    return {
        setters: [
            function (promiser_1_1) {
                promiser_1 = promiser_1_1;
            },
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            },
            function (chatAnswerParser_1_1) {
                chatAnswerParser_1 = chatAnswerParser_1_1;
            }
        ],
        execute: function () {
        }
    };
});
