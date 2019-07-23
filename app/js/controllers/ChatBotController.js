System.register(["../models/index", "../views/ChatBotView", "../helpers/chatbot/ChatBotManager"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var index_1, ChatBotView_1, ChatBotManager_1, ChatBotController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (ChatBotView_1_1) {
                ChatBotView_1 = ChatBotView_1_1;
            },
            function (ChatBotManager_1_1) {
                ChatBotManager_1 = ChatBotManager_1_1;
            }
        ],
        execute: function () {
            ChatBotController = class ChatBotController {
                constructor() {
                    this.chatBotView = new ChatBotView_1.ChatBotView('#chatbot-view');
                    this.chatBotView.didMount((model) => {
                        document.getElementById('chatbot-clear').addEventListener('click', this.clear.bind(this));
                        Array.from(document.getElementById('chatbot-history').getElementsByTagName('button')).forEach(button => {
                            button.addEventListener('click', this.message.bind(this, new Event(''), [index_1.ChatAgent.User, button.getAttribute('data-value')]));
                        });
                        document.getElementById('chatbot-input-form').addEventListener('submit', this.message.bind(this));
                        this.messageInput = document.getElementById('chatbot-input-field');
                    });
                    this.chatBotManager = new ChatBotManager_1.ChatBotManager();
                    this.chatBotView.update(this.chatBotManager.init());
                }
                message(event, msg) {
                    return __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        if (!msg) {
                            msg = [index_1.ChatAgent.User, this.messageInput.value];
                        }
                        this.chatBotView.update(this.chatBotManager.message([msg]));
                        this.chatBotView.update(yield this.chatBotManager.answer());
                    });
                }
                clear(event) {
                    this.chatBotView.update(this.chatBotManager.clear());
                }
            };
            exports_1("ChatBotController", ChatBotController);
        }
    };
});
