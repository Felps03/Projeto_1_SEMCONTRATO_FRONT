System.register(["./View", "./ChatHistoryView"], function (exports_1, context_1) {
    "use strict";
    var View_1, ChatHistoryView_1, ChatBotView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (ChatHistoryView_1_1) {
                ChatHistoryView_1 = ChatHistoryView_1_1;
            }
        ],
        execute: function () {
            ChatBotView = class ChatBotView extends View_1.View {
                constructor(selector, escape = false) {
                    super(selector, escape);
                }
                template(model) {
                    return `
<div id="chatbot-ducky" class="position-fixed rounded-circle p-1 shadow">
    <img src="./img/contratinhoduck.png" height="90" style="transform:scaleX(-1)">
</div>

<div id="chatbot-area" class="position-fixed rounded-0 shadow">


    <div id="chatbot-tab" class="align-items-center d-flex right-0 pl-3">
        <i class="material-icons">chat</i>
        <h5 class="m-1">Chat</h5>

        <div class="ml-auto mr-3">
            <i class="material-icons">keyboard_arrow_down</i>
        </div>

        <!--<a class="w-100" href="#" id="refresh-chat">
            <i class="material-icons float-right mr-3">refresh</i>
        </a>-->
    </div>
    <div id="chatbot-body" class="d-flex">

        <div id="chatbot-history-view">
        </div>

        <div id="chatbot-input" class="mt-auto">
            <div class="p-1 h-100">
                <form action="" id="chatbot-input-form">
                    <div class="form-group m-1">
                        <textarea name="bot-msg" class="form-control form-control-sm input-circle"
                            id="chatbot-input-field" placeholder="Digite sua mensagem aqui"></textarea>
                        <div></div>
                    </div>

                    <div class="align-items-center d-inline-flex d-row justify-content-end ml-1">
                        <button id="chatbot-clear" type="submit" class="align-items-center btn btn-danger btn-sm d-flex">
                            <i class="material-icons">autorenew</i>
                        </button>
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
                    this.chatHistoryView = new ChatHistoryView_1.ChatHistoryView('#chatbot-history-view');
                    this.chatHistoryView.update(model);
                    const chatBotArea = document.getElementById('chatbot-area');
                    const handleActive = () => {
                        chatBotArea.classList.toggle('active');
                    };
                    document.getElementById('chatbot-tab').addEventListener('click', handleActive);
                    document.getElementById('chatbot-ducky').addEventListener('click', handleActive);
                    if (this.didMountFn)
                        this.didMountFn(model);
                    if (this.innerDidMountFn)
                        this.innerDidMountFn(model);
                }
                updateInner(model) {
                    this.chatHistoryView.update(model);
                    if (this.innerDidMountFn)
                        this.innerDidMountFn(model);
                }
                innerDidMount(cb) {
                    this.innerDidMountFn = cb;
                }
                didMount(cb) {
                    this.didMountFn = cb;
                }
            };
            exports_1("ChatBotView", ChatBotView);
        }
    };
});
