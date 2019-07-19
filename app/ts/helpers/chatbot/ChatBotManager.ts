import { Chat, ChatAgent } from "../../models/Chat";
import * as templates from './chatBotTemplates'
import { dialog, DialogBranch, mainBranch } from './chatBotTree'

export class ChatBotManager {

    private chat: Chat
    private context: string

    constructor() {
        this.chat = new Chat()
    }

    init() {
        this.getFromStorage()

        // simpler conditions weren't possible for some reason
        if (this.chat.History.length === 0) {

            this.message([this.toBranch(mainBranch)])

        }

        this.store()

        return this.chat
    }

    message(msgs: [ChatAgent, string][]): Chat {

        msgs.forEach((msg: [ChatAgent, string]) => {
            this.chat.add(msg)
        })

        this.store()

        return this.chat
    }

    answer(): Promise<Chat> {
        return new Promise((resolve, reject) => {
            if (dialog[this.context]) {
                let success = false
                const lastMsg = this.chat.LastMsg
                const normalizedMsg = lastMsg ? lastMsg[1].toLocaleLowerCase() : ''

                for (let branch of dialog[this.context]) {
                    if (branch.call) {
                        for (let synonym of branch.call) {

                            if (normalizedMsg.indexOf(synonym) !== -1) {
                                success = true
                                const possiblePre = this.toBranch(branch)

                                setTimeout(() => {

                                    let msgs: [ChatAgent, string][] = []
                                    msgs.push([ChatAgent.Bot, branch.answer])
                                    if (possiblePre) {
                                        msgs.push(possiblePre)
                                    }

                                    resolve(this.message(msgs))
                                }, 500)

                                break
                            }
                        }
                    }
                }

                if (!success) {
                    setTimeout(() => {
                        this.store()

                        resolve(this.message([[ChatAgent.Bot, dialog['understandnt'][0].answer]]))
                    }, 500)
                }
            } else {
                this.context = Object.getOwnPropertyNames(dialog)[0]
            }
        })
    }

    store() {
        localStorage.setItem('chatLog', JSON.stringify({
            chat: this.chat,
            context: this.context
        }))
    }

    toBranch(branch: DialogBranch): [ChatAgent, string] {
        this.context = branch.goto
        this.store()

        if (dialog[this.context][0].pre) {
            return [ChatAgent.Bot, dialog[this.context][0].pre]
        }

    }

    getFromStorage() {
        const chatLog = JSON.parse(localStorage.getItem('chatLog'))
        if (chatLog) {
            this.chat = Chat.parse(chatLog.chat)
            this.context = chatLog.context
        }
    }

    clear() {
        this.toBranch(mainBranch)
        this.chat = new Chat()
        this.store()
        this.init()
        return this.chat
    }

    get Chat() {
        return this.chat
    }
}