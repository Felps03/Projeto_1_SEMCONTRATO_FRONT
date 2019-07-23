import { Chat, ChatAgent } from '../../models/Chat'
import { dialog, DialogBranch, mainBranch } from './chatBotTree'
import { normalize } from '../../utils/normalizeTxt'
import { parseState } from './chatAnswerParser'

export class ChatBotManager {
    private chat: Chat
    private context: string

    private state: Map<string, string>

    constructor() {
        this.chat = new Chat()
        this.state = new Map<string, string>()
    }

    init() {
        this.getFromStorage()

        // simpler conditions weren't possible for some reason
        if (this.chat.History.length === 0) {
            this.message([[ChatAgent.Bot, this.toBranch(mainBranch)]])
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
                const normalizedMsg = lastMsg ? normalize(lastMsg[1]) : ''

                for (let branch of dialog[this.context]) {
                    if (branch.call) {
                        for (let synonym of branch.call) {

                            if (branch.normalize === undefined)
                                branch.normalize = true

                            const processed = new RegExp(synonym).exec(
                                branch.normalize ? normalizedMsg : lastMsg[1]
                            )

                            if (processed) {
                                success = true

                                if (branch.process) {
                                    branch.process(this.state, processed)
                                }

                                const actualState = this.state
                                const possiblePre = this.toBranch(branch)

                                setTimeout(() => {
                                    let msgs: [ChatAgent, string][] = []
                                    msgs.push([
                                        ChatAgent.Bot,
                                        parseState(actualState, branch.answer)
                                    ])
                                    if (possiblePre) {
                                        msgs.push([
                                            ChatAgent.Bot,
                                            parseState(actualState, possiblePre)
                                        ])
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

                        resolve(
                            this.message([
                                [
                                    ChatAgent.Bot,
                                    dialog['understandnt'][0].answer
                                ]
                            ])
                        )
                    }, 500)
                }
            } else {
                this.context = Object.getOwnPropertyNames(dialog)[0]
            }
        })
    }

    store() {
        localStorage.setItem(
            'chatLog',
            JSON.stringify({
                chat: this.chat,
                context: this.context,
                state: [...this.state]
            })
        )
    }

    toBranch(branch: DialogBranch): string {
        this.context = branch.goto
        if (this.context === mainBranch.goto) {
            this.state = new Map<string, string>()
        }
        this.store()

        if (dialog[this.context][0].pre) {
            return dialog[this.context][0].pre
        }
    }

    getFromStorage() {
        const chatLog = JSON.parse(localStorage.getItem('chatLog'))
        if (chatLog) {
            this.chat = Chat.parse(chatLog.chat)
            this.context = chatLog.context
            this.state = new Map(chatLog.state)
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
