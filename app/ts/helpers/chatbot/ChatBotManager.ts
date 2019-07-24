import { Chat, ChatAgent } from '../../models/Chat'
import { dialog, DialogBranch, mainBranch } from './chatBotTree'
import { normalize, delay } from '../../utils/index'
import { parseState } from './chatAnswerParser'

export class ChatBotManager {
    private chat: Chat
    private context: string

    private state: Map<string, string>

    public DELAY_TIME: number

    constructor(DELAY_TIME: number = 300) {
        this.chat = new Chat()
        this.state = new Map<string, string>()

        this.DELAY_TIME = DELAY_TIME
    }

    init() {
        this.getFromStorage()

        // simpler conditions weren't possible for some reason
        if (this.chat.History.length === 0) {
            this.message([ChatAgent.Bot, this.toBranch(mainBranch)])
        }

        this.store()

        return this.chat
    }

    message(msg: [ChatAgent, string]): Chat {
        this.chat.add(msg)

        this.store()

        return this.chat
    }

    async *answer(): AsyncIterableIterator<Chat> {
        // return new Promise((resolve, reject) => {
        if (dialog[this.context]) {
            let success = false
            const lastMsg = this.chat.LastMsg
            const normalizedMsg = lastMsg ? normalize(lastMsg[1]) : ''

            for (let branch of dialog[this.context]) {
                if (branch.call) {
                    for (let synonym of branch.call) {
                        const processed = new RegExp(synonym).exec(
                            normalizedMsg
                        )

                        if (processed) {
                            success = true

                            // default to true
                            if (branch.artificialDelay === undefined)
                                branch.artificialDelay = true

                            if (branch.process) {
                                branch.process(this.state, processed)
                            }

                            const actualState = this.state
                            const possiblePre = this.toBranch(branch)

                            let msgs: [ChatAgent, string][] = branch.answer.map(
                                (msg: string): [ChatAgent, string] => [
                                    ChatAgent.Bot,
                                    parseState(actualState, msg)
                                ]
                            )

                            if (possiblePre) {
                                msgs.push([
                                    ChatAgent.Bot,
                                    parseState(actualState, possiblePre)
                                ])
                            }

                            for (const msg of msgs) {
                                yield delay(this.message(msg), branch.artificialDelay ? this.DELAY_TIME : 0)
                            }

                            return
                        }
                    }
                }
            }

            if (!success) {

                this.store()

                for (let msg of dialog['understandnt'][0].answer) {
                    yield delay(this.message(
                        [
                            ChatAgent.Bot,
                            parseState(this.state, msg)
                        ]
                    ), this.DELAY_TIME)
                }
            }

        } else {
            this.context = Object.getOwnPropertyNames(dialog)[0]
        }
        // })
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
