import * as templates from './chatBotTemplates'

export type DialogBranch = {
    call?: string[]
    goto?: string

    pre?: string
    answer?: string

    artificialDelay?: boolean
    fetch?: string
}

const BOT_NAME = 'Contratinho'
const NOT_IMPLEMENTED_ANSWER = 'Hm... desculpa, não sei fazer isso ainda 😔'

const actualHours = new Date().getHours()
let greeting;

if (actualHours >= 4 && actualHours < 12) {
    greeting = 'Bom dia'
} else if (actualHours < 20) {
    greeting = 'Boa tarde'
} else {
    greeting = 'Boa noite'
}

export const mainBranch = {
    goto: 'main'
}

export const dialog: { [node: string]: DialogBranch[] } = {
    'main': [
        {
            pre: `${greeting}! Meu nome é ${BOT_NAME}, como posso ajudar? 🙂 ${
                templates.options({
                    'DailyNote': 'DailyNote',
                    'HelpCenter': 'HelpCenter',
                    'Login': 'Login'
                })}`,
        },
        {
            call: ['dailynote', 'daily'],
            goto: 'cr_daily',
            answer: `Ok. Sobre DailyNote, o que você quer fazer? ${
                templates.options({
                    'Listar': 'Listar',
                    'Adicionar': 'Adicionar',
                })}`
        },
        {
            call: ['helpcenter', 'help'],
            goto: 'cr_help',
            answer: `Ok. Sobre HelpCenter, o que você quer fazer? ${
                templates.options({
                    'Listar': 'Listar',
                    'Adicionar': 'Adicionar',
                })}`
        },
        {
            call: ['login'],
            goto: 'main',
            answer: NOT_IMPLEMENTED_ANSWER
        }
    ],

    'cr_daily': [
        {
            call: ['listar', 'ver', 'mostrar'],
            goto: 'main',
            answer: templates.link('Clique aqui para ver as dailies! 😃', 'https://semcontrato.azurewebsites.net/app-daily-note.html')
        },
        {
            call: ['adicionar', 'incluir', 'inserir'],
            goto: 'main',
            answer: NOT_IMPLEMENTED_ANSWER
        },
    ],

    'cr_help': [
        {
            call: ['listar', 'ver', 'mostrar'],
            goto: 'main',
            answer: templates.link('Clique aqui para ver os posts! 😃', 'https://semcontrato.azurewebsites.net/app-help-center.html')
        },
        {
            call: ['adicionar', 'incluir', 'inserir'],
            goto: 'main',
            answer: NOT_IMPLEMENTED_ANSWER
        },
    ],

    'login': [
        {
            goto: 'main',
            answer: NOT_IMPLEMENTED_ANSWER
        }
    ],

    'understandnt': [
        {
            goto: 'main',
            answer: 'Hm... Desculpe, não entendi 😕'
        }
    ]
}