System.register(["./View", "../models/Chat", "../helpers/chatbot/chatAnswerParser", "../utils/escapeTag"], function (exports_1, context_1) {
    "use strict";
    var View_1, Chat_1, chatAnswerParser_1, escapeTag_1, ChatHistoryView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            },
            function (chatAnswerParser_1_1) {
                chatAnswerParser_1 = chatAnswerParser_1_1;
            },
            function (escapeTag_1_1) {
                escapeTag_1 = escapeTag_1_1;
            }
        ],
        execute: function () {
            ChatHistoryView = class ChatHistoryView extends View_1.View {
                constructor(selector, escape = false) {
                    super(selector, escape);
                    this.active = false;
                }
                template(model) {
                    this.lastModel = model;
                    return `
        <div id="chatbot-history">
            <ul>
            ${model.History.map((msg) => {
                        const author = msg[0];
                        let processedMsg;
                        if (author === Chat_1.ChatAgent.User) {
                            processedMsg = escapeTag_1.escapeTag(msg[1]);
                        }
                        else {
                            processedMsg = chatAnswerParser_1.parseView(msg[1]);
                        }
                        processedMsg = processedMsg.replace(/\n/g, '<br>');
                        return `
                    <li data-author="${author}" class="shadow-sm ${/^\s*{{button\(.*\)}}\s*$/.test(msg[1]) ? 'w-100 p-0' : ''}">
                        ${processedMsg}
                    </li>
                `;
                    }).join('')} 
            </ul>
        </div>
        `;
                }
                update(model) {
                    super.update(model);
                    const chatBotHistory = document.getElementById('chatbot-history');
                    chatBotHistory.scrollTo(0, chatBotHistory.scrollHeight);
                    if (this.didMountFn)
                        this.didMountFn(model);
                }
                didMount(cb) {
                    this.didMountFn = cb;
                }
            };
            exports_1("ChatHistoryView", ChatHistoryView);
        }
    };
});
