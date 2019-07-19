System.register(["./View", "../models/Chat"], function (exports_1, context_1) {
    "use strict";
    var View_1, Chat_1, ChatBotView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            }
        ],
        execute: function () {
            ChatBotView = class ChatBotView extends View_1.View {
                constructor(selector, escape = false) {
                    super(selector, escape);
                    this.active = false;
                }
                template(model) {
                    this.lastModel = model;
                    return `
<div id="chatbot-area" class="position-fixed rounded-0 shadow ${this.active ? 'active' : ''}">
    <div id="chatbot-tab" class="align-items-center d-flex right-0 pl-3">
        <i class="material-icons">chat</i>
        <h5 class="m-1">Chat</h5>
    </div>
    <div id="chatbot-body">

        <div id="chatbot-history">
            <ul>
            ${model.History.map((msg) => {
                        msg[1] = msg[0] === Chat_1.ChatAgent.User ? msg[1].replace('<', '&lt;').replace('>', '&gt;') : msg[1];
                        msg[1] = msg[1].replace('\n', '<br>');
                        return `
                <li data-author="${msg[0]}" class="shadow-sm">
                    <span class="chatbot-msg">
                        ${msg[1]}
                    </span>
                </li>
            `;
                    }).join('')} 
            </ul>
        </div>

        <div id="chatbot-input">
            <div class="p-1">
                <form action="" id="chatbot-input-form">
                    <div class="form-group m-1">
                        <textarea name="bot-msg" class="form-control form-control-sm input-circle"
                            id="chatbot-input-field" placeholder="Digite sua mensagem aqui"></textarea>
                        <div></div>
                    </div>

                    <div class="align-items-center d-inline-flex d-row float-right justify-content-end mr-1">
                        <button type="submit" class="align-items-center btn btn-primary btn-sm d-flex">Enviar <i
                                class="material-icons ml-2">send</i></button>
                    </div>
                </form>

            </div>
        </div>

    </div>
</div>
        `;
                }
                update(model) {
                    super.update(model);
                    document.getElementById('chatbot-tab').addEventListener('click', () => {
                        this.active = !this.active;
                        this.update(this.lastModel);
                    });
                    if (this.didMountFn)
                        this.didMountFn(model);
                }
                didMount(cb) {
                    this.didMountFn = cb;
                }
            };
            exports_1("ChatBotView", ChatBotView);
        }
    };
});
