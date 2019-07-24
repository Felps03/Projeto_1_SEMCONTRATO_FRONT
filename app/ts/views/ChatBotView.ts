import { View } from './View';
import { DailyNote, User } from '../models/index';
import { Chat, ChatAgent } from '../models/Chat';
import { parseView } from '../helpers/chatbot/chatAnswerParser';

export class ChatBotView extends View<Chat> {

    private didMountFn: Function
    private lastModel: Chat | null
    private active: boolean

    constructor(selector: string, escape: boolean = false) {
        super(selector, escape)

        this.active = false
    }

    template(model: Chat): string {

        this.lastModel = model

        return `
<div id="chatbot-area" class="position-fixed rounded-0 shadow ${this.active ? 'active' : ''}">
    <div id="chatbot-tab" class="align-items-center d-flex right-0 pl-3">
        <i class="material-icons">chat</i>
        <h5 class="m-1">Chat</h5>

        <!--<a class="w-100" href="#" id="refresh-chat">
            <i class="material-icons float-right mr-3">refresh</i>
        </a>-->
    </div>
    <div id="chatbot-body">

        <div id="chatbot-history">
            <ul>
            ${model.History.map((msg: [ChatAgent, string]) => {
            // if the author is the user, escape it

            const author = msg[0]
            let content = msg[1]

            if (author === ChatAgent.User) {
                content = content.replace('<', '&lt;').replace('>', '&gt;')
            } else {
                content = parseView(content)
            }

            content = content.replace(/\n/g, '<br>')

            return `
                <li data-author="${author}" class="shadow-sm">
                    <span class="chatbot-msg">
                        ${content}
                    </span>
                </li>
            `
        }).join('')} 
            </ul>
        </div>

        <div id="chatbot-input">
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

    update(model: Chat) {
        super.update(model)

        const chatBotHistory = document.getElementById('chatbot-history')
        chatBotHistory.scrollTo(0, chatBotHistory.scrollHeight)

        document.getElementById('chatbot-tab').addEventListener('click', () => {
            this.active = !this.active
            this.update(this.lastModel)
        })

        if (this.didMountFn)
            this.didMountFn(model)
    }

    didMount(cb: Function) {
        this.didMountFn = cb
    }
}