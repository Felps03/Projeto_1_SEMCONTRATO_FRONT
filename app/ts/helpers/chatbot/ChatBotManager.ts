import { Chat, ChatAgent } from '../../models/Chat'
import { dialog, DialogBranch, mainBranch } from './chatBotTree'
import { normalize, delay } from '../../utils/index'
import { parseState } from './chatAnswerParser'
import { promiser } from '../../utils/promiser';
import { resolveAll } from '../../utils/resolveAll';

export class ChatBotManager {
    private chat: Chat
    private context: string

    private state: Map<string, any>

    public DELAY_TIME: number

    constructor(DELAY_TIME: number = 250) {
        this.chat = new Chat()
        this.state = new Map<string, any>()

        this.DELAY_TIME = DELAY_TIME
    }

    async *init() {
        this.getFromStorage()

        // simpler conditions weren't possible for some reason
        if (this.chat.History.length === 0) {
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

                    if (branch.normalize === undefined)
                        branch.normalize = true

                    if (branch.call) {
                        for (let synonym of branch.call) {

                            if (branch.normalize === undefined)
                                branch.normalize = true

                            const processed = new RegExp(synonym).exec(
                                branch.normalize ? normalizedMsg : lastMsg[1]
                            )

                            if (processed) {
                                success = true

                                if (!(synonym instanceof RegExp)) {
                                    const actualPath = this.state.get('_PATH')
                                    const first = actualPath === undefined
                                    this.state.set('_PATH', `${first ? '' : `${actualPath}.`}${synonym}`)
                                }

                                const msgs = await this.toBranch(branch, processed)

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

                    for (let msg of await resolveAll(dialog['understandnt'].greet, this.state)) {

                        yield delay(this.message(
                            msg
                        ), this.DELAY_TIME)

                    }

                    // because people were confused
                    const actualBranch = dialog[this.context]
                    for (const msg of await resolveAll(actualBranch.greet, this.state)) {
                        yield delay(this.message(msg), this.DELAY_TIME)
                    }

                }
                // if answering to nothing
            } else {
                let msgs: [ChatAgent, string][] = []
                // main greeting
                msgs.push([ChatAgent.Bot, mainBranch.greet])
                // greeting of the branch to go to, if exists
                msgs.push(... await this.toBranch(dialog[mainBranch.goto], null))

                // const possibleGreet = dialog[this.context].greet
                // if (possibleGreet) {
                //     possibleGreet.forEach(greet => {
                //         msgs.push([ChatAgent.Bot, greet])
                //     })
                // }

                for (const msg of msgs) {
                    yield delay(this.message(msg), this.DELAY_TIME)
                }
            }

        } else {
            this.context = mainBranch.goto;
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

    // here be dragons
    async toBranch(branch: DialogBranch | string, match: RegExpExecArray): Promise<[ChatAgent, string][]> {
        // console.log('>>', this.context)
        if (typeof branch === 'string') {
            if (branch === mainBranch.goto) {
                this.state = new Map<string, any>()
            }
            branch = dialog[branch]
            this.store()
        }
        // default to true
        if (branch.artificialDelay === undefined)
            branch.artificialDelay = true

        if (branch.process) {
            await branch.process(this.state, match)
        }

        const gotoOverride = this.state.get('_GOTO')
        if (gotoOverride) {
            this.context = gotoOverride
            this.state.delete('_GOTO')
            this.store()
            //return await this.toBranch(gotoOverride, null)
        } else if (branch.goto) {
            this.context = branch.goto
            this.store()
        }

        const actualState = this.state

        if (this.context === mainBranch.goto) {
            this.state = new Map<string, any>()
        }

        // dialog may have a promise response
        let promises: Promise<string>[] = []
        let msgs: [ChatAgent, string][] = []

        const answersOverride = actualState.get('_ANSWER')
        if (answersOverride && Array.isArray(answersOverride)) {
            answersOverride.forEach(answer => {
                msgs.push([ChatAgent.Bot, parseState(actualState, answer)])
            })
            this.state.delete('_ANSWER')

        } else {

            msgs = await resolveAll(branch.answer, actualState)
        }

        const possibleGreet = dialog[this.context].greet
        const possibleProcess = dialog[this.context].process
        const possibleFlow = dialog[this.context].flow

        if (possibleProcess) {
            possibleProcess(this.state)
        }

        if (possibleGreet) {
            msgs = msgs.concat(await resolveAll(possibleGreet, actualState))
        }

        if (possibleFlow) {
            this.context = possibleFlow

            msgs.push(...await this.toBranch(possibleFlow, null))
        }

        return msgs
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
        this.toBranch(mainBranch, null)
        this.chat = new Chat()
        this.store()
        this.init()
        yield* this.answer()
    }

    get Chat() {
        return this.chat
    }
}
