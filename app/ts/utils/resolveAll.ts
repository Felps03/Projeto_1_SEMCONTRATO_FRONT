import { promiser } from "./promiser";
import { ChatAgent } from "../models/Chat";
import { parseState } from "../helpers/chatbot/chatAnswerParser";

export async function resolveAll(
    all: (string | ((state: Map<string, any>) => (string | null | Promise<string | null>)))[],
    state: Map<string, any>
) {
    let msgs: [ChatAgent, string][] = []
    let promises: Promise<string | null>[] = []

    if (all) {
        msgs = all.reduce((msgs, msg) => {
            if (msg instanceof Function) {
                const msgVal = promiser(msg(state))
                promises.push(msgVal)

            } else
                msgs.push([ChatAgent.Bot, parseState(state, msg)])

            return msgs

        }, ([] as [ChatAgent, string][]))
    }

    await Promise.all(promises).then((ress: string[]) => {
        ress.forEach(res => {
            if (res)
                msgs.push([ChatAgent.Bot, parseState(state, res)])
        })
    })

    return msgs
}