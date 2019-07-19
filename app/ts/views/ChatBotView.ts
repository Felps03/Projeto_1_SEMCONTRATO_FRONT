import { View } from './View';
import { DailyNote, User } from '../models/index';
import { Chat, ChatAgent } from '../models/Chat';

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
    </div>
    <div id="chatbot-body">

        <div id="chatbot-history">
            <ul>
            ${
            model.History.map((msg: [ChatAgent, string]) => {

                // if the author is the user, escape it
                msg[1] = msg[0] === ChatAgent.User ? msg[1].replace('<', '&lt;').replace('>', '&gt;') : msg[1]
                msg[1] = msg[1].replace('\n', '<br>')

                return `
                <li data-author="${msg[0]}" class="shadow-sm">
                    <span class="chatbot-msg">
                        ${msg[1]}
                    </span>
                </li>
            `}
            ).join('')
            } 
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

    update(model: Chat) {
        super.update(model)

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