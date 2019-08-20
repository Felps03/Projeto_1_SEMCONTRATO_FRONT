import { View } from './View';
import { DailyNote, User } from '../models/index';
import { Chat, ChatAgent } from '../models/Chat';
import { parseView } from '../helpers/chatbot/chatAnswerParser';
import { escapeTag } from '../utils/escapeTag';

export class ChatHistoryView extends View<Chat> {

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
        <div id="chatbot-history">
            <ul>
            ${model.History.map((msg: [ChatAgent, string]) => {

            const author = msg[0]
            let processedMsg
            // if the author is the user, escape it
            if (author === ChatAgent.User) {
                processedMsg = escapeTag(msg[1])
            } else {
                processedMsg = parseView(msg[1])
            }

            processedMsg = processedMsg.replace(/\n/g, '<br>')

            return `
                    <li data-author="${author}" class="shadow-sm ${/^\s*{{button\(.*\)}}\s*$/.test(msg[1]) ? 'w-100 p-0' : ''}">
                        ${processedMsg}
                    </li>
                `
        }).join('')} 
            </ul>
        </div>
        `;
    }

    update(model: Chat) {
        super.update(model)

        const chatBotHistory = document.getElementById('chatbot-history')
        chatBotHistory.scrollTo(0, chatBotHistory.scrollHeight)

        // document.getElementById('chatbot-tab').addEventListener('click', () => {
        //     this.active = !this.active
        //     this.update(this.lastModel)
        // })

        if (this.didMountFn)
            this.didMountFn(model)
    }

    didMount(cb: Function) {
        this.didMountFn = cb
    }
}