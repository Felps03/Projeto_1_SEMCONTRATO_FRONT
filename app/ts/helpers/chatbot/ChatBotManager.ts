import { Chat, ChatAgent } from '../../models/Chat'
import { dialog, DialogBranch, mainBranch } from './chatBotTree'
import { normalize, delay } from '../../utils/index'
import { parseState } from './chatAnswerParser'

export class ChatBotManager {
    private chat: Chat
    private context: string

    private state: Map<string, string>

    public DELAY_TIME: number

    constructor(DELAY_TIME: number = 250) {
        this.chat = new Chat()
        this.state = new Map<string, string>()

        this.DELAY_TIME = DELAY_TIME
    }

    async *init() {
        this.getFromStorage()

        // simpler conditions weren't possible for some reason
        if (this.chat.History.length === 0) {
            console.log('init')
            yield* this.answer()
        } else {
            yield this.chat
        }

        this.store()
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

            // answering to something
            if (lastMsg) {
                const normalizedMsg = lastMsg ? normalize(lastMsg[1]) : ''

                for (let branch of dialog[this.context].children) {
                    if (branch.call) {
                        for (let synonym of branch.call) {

                            if (branch.normalize === undefined)
                                branch.normalize = true

                            const processed = new RegExp(synonym).exec(
                                branch.normalize ? normalizedMsg : lastMsg[1]
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
                                this.toBranch(branch)
                                const possibleGreet = dialog[this.context].greet

                                let msgs: [ChatAgent, string][] = branch.answer.map(
                                    (msg: string): [ChatAgent, string] => [
                                        ChatAgent.Bot,
                                        parseState(actualState, msg)
                                    ]
                                )

                                if (possibleGreet) {
                                    possibleGreet.forEach(greet => {
                                        msgs.push([
                                            ChatAgent.Bot,
                                            parseState(actualState, greet)
                                        ])
                                    })
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

                    for (let msg of dialog['understandnt'].children[0].answer) {
                        yield delay(this.message(
                            [
                                ChatAgent.Bot,
                                parseState(this.state, msg)
                            ]
                        ), this.DELAY_TIME)
                    }
                }
                // if answering to nothing
            } else {
                let msgs: [ChatAgent, string][] = []
                // main greeting
                msgs.push([ChatAgent.Bot, mainBranch.greet])
                // greeting of the branch to go to, if exists
                this.toBranch(mainBranch)

                const possibleGreet = dialog[this.context].greet
                if (possibleGreet) {
                    possibleGreet.forEach(greet => {
                        msgs.push([ChatAgent.Bot, greet])
                    })
                }

                for (const msg of msgs) {
                    yield delay(this.message(msg), this.DELAY_TIME)
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

    toBranch(branch: DialogBranch) {
        this.context = branch.goto
        if (this.context === mainBranch.goto) {
            this.state = new Map<string, string>()
        }
        this.store()
    }

    getFromStorage() {
        const chatLog = JSON.parse(localStorage.getItem('chatLog'))
        if (chatLog) {
            this.chat = Chat.parse(chatLog.chat)
            this.context = chatLog.context
            this.state = new Map(chatLog.state)
        }
    }

    async *clear() {
        this.toBranch(mainBranch)
        this.chat = new Chat()
        this.store()
        this.init()
        yield* this.answer()
    }

    get Chat() {
        return this.chat
    }
}
