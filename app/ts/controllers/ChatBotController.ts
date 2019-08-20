import { Chat, ChatAgent } from '../models/index';
// import { HelpCenterService, UserService } from '../services/index';
import { ChatBotView } from '../views/ChatBotView';
import { ChatBotManager } from '../helpers/chatbot/ChatBotManager';

export class ChatBotController {

    private chatBotView: ChatBotView
    private chatBotManager: ChatBotManager

    private messageInput: HTMLInputElement

    constructor() {

        this.chatBotView = new ChatBotView('#chatbot-view')

        this.chatBotView.didMount((model: Chat) => {

            document.getElementById('chatbot-clear').addEventListener('click', this.clear.bind(this))
            document.getElementById('chatbot-input-form').addEventListener('submit', this.message.bind(this))

            this.messageInput = <HTMLInputElement>document.getElementById('chatbot-input-field')
        })

        this.chatBotView.innerDidMount((model: Chat) => {
            Array.from(document.getElementById('chatbot-history').getElementsByTagName('button'))
                .forEach(button => {

                    button.addEventListener('click',
                        this.message.bind(
                            this,
                            new Event(''),
                            [ChatAgent.User, button.getAttribute('data-value')])
                    )

                })
        })

        this.chatBotManager = new ChatBotManager();

        (async () => {
            for await (const chat of this.chatBotManager.init()) {
                this.chatBotView.update(chat)
            }
        })()

    }

    async message(event: Event, msg?: [ChatAgent, string]) {
        event.preventDefault()

        if (!msg) {
            msg = [ChatAgent.User, this.messageInput.value]
            this.messageInput.value = ''
        }

        this.chatBotView.updateInner(
            this.chatBotManager.message(msg)
        )

        for await (const chat of this.chatBotManager.answer()) {
            this.chatBotView.updateInner(chat)
        }
    }

    async clear(event: Event) {
        event.preventDefault()

        for await (const chat of this.chatBotManager.clear()) {
            this.chatBotView.updateInner(
                chat
            )
        }
    }

}