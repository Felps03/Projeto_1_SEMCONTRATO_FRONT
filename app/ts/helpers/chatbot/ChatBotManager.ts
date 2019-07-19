import { Chat, ChatAgent } from "../../models/Chat";
import * as templates from './chatBotTemplates'
import dialog from './chatBotTree'

const BOT_NAME = 'Teleckinho'

export class ChatBotManager {

    private chat: Chat
    private context: string

    constructor() {
        this.chat = new Chat()
        this.context = Object.getOwnPropertyNames(dialog)[0]
    }

    init() {
        const chatLog = localStorage.getItem('chatLog')

        if (!chatLog) {

            const actualHours = new Date().getHours()
            let greeting;

            if (actualHours >= 4 && actualHours < 12) {
                greeting = 'Bom dia'
            } else if (actualHours < 20) {
                greeting = 'Boa tarde'
            } else {
                greeting = 'Boa noite'
            }

            this.chat.add([ChatAgent.Bot, `${greeting}! Meu nome é ${BOT_NAME}, como posso ajudar? 🙂 ${
                templates.options({
                    'DailyNote': 'DailyNote',
                    'HelpCenter': 'HelpCenter',
                    'Login': 'Login'
                })}`]
            )

        } else {

            this.chat = Chat.parse(chatLog)
        }

        localStorage.setItem('chatLog', JSON.stringify(this.chat))

        return this.chat
    }

    message(msg: [ChatAgent, string]): Chat {
        this.chat.add(msg)

        localStorage.setItem('chatLog', JSON.stringify(this.chat))

        return this.chat
    }

    answer(): Promise<Chat> {
        return new Promise((resolve, reject) => {
            if (dialog[this.context]) {
                let success = false
                const normalizedMsg = this.chat.LastMsg[1].toLocaleLowerCase()

                dialog[this.context].forEach(branch => {
                    if (branch.call) {
                        branch.call.forEach(synonym => {

                            if (normalizedMsg.indexOf(synonym) !== -1) {
                                success = true
                                this.context = branch.goto

                                setTimeout(() => {
                                    localStorage.setItem('chatLog', JSON.stringify(this.chat))

                                    resolve(this.message([ChatAgent.Bot, branch.answer]))
                                }, 500)

                            }

                        })
                    }
                })

                if (!success) {
                    resolve(this.message([ChatAgent.Bot, dialog['undertandnt'][0].answer]))
                }
            } else {
                this.context = Object.getOwnPropertyNames(dialog)[0]
            }
        })
    }

    get Chat() {
        return this.chat
    }
}