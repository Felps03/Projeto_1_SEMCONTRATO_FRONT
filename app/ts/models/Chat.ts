export enum ChatAgent {
    User = 'user',
    Bot = 'bot'
}

export class Chat {
    constructor(
        private history: [ChatAgent, string][] = [],
    ) { }

    add(msg: [ChatAgent, string]) {
        this.history.push(msg)
    }

    get History() {
        return this.history
    }

    get LastMsg() {
        return this.history[this.history.length - 1]
    }

    static parse(str: string): Chat {
        return new Chat(JSON.parse(str).history)
    }

}