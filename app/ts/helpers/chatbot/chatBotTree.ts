import * as process from './chatBotProcessEntities'

export type DialogBranch = {
    // go into branch if one call matches
    call?: string[] | RegExp[]
    // whether to normalize the input for better matching
    normalize?: boolean
    // the branch to go
    goto?: string

    // how to process the regexp match (likely to be
    // related with entities)
    process?: Function

    // what to say when entering branch
    answer?: string

    // future
    artificialDelay?: boolean
    fetch?: string

    // special: if present in the first child "branch",
    // the specified message will be sent
    pre?: string
}

const BOT_NAME = 'Contratinho'
const NOT_IMPLEMENTED_ANSWER = 'Hm... desculpa, não sei fazer isso ainda 😔'
const SELF_HTTPS_HOST = 'http://' + window.location.host

const actualHours = new Date().getHours()
let greeting

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
    main: [
        {
            pre: `${greeting}! Meu nome é ${BOT_NAME}, como posso ajudar? 🙂 {{options(DailyNote, HelpCenter, Login)}}`
        },
        {
            call: ['dailynote', 'daily'],
            goto: 'cr_daily',
            answer: `Ok. Sobre DailyNote, o que você quer fazer? {{options(Listar, Adicionar)}}`
        },
        {
            call: ['helpcenter', 'help'],
            goto: 'cr_help',
            answer: `Ok. Sobre HelpCenter, o que você quer fazer? {{options(Listar, Adicionar)}}`
        },
        {
            call: ['login'],
            goto: 'main',
            answer: NOT_IMPLEMENTED_ANSWER
        }
    ],

    cr_daily: [
        {
            call: ['listar', 'ver', 'mostrar'],
            goto: 'list_daily',
            answer:
                'Gostaria de filtrar por data ou usuário? {{options(Não, Data, Usuário)}}'
        },
        {
            call: ['adicionar', 'incluir', 'inserir'],
            goto: 'main',
            answer: NOT_IMPLEMENTED_ANSWER
        }
    ],

    list_daily: [
        {
            call: ['data', 'dia'],
            goto: 'list_daily_date',
            answer: 'Ok. Que dia? (formato dd/mm/aaaa)'
        },
        {
            call: ['usuario'],
            goto: 'list_daily_user',
            answer: 'Ok. Que usuário?'
        },
        {
            call: ['nao', 'nop'],
            goto: 'main',
            answer: `{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html)}}`
        }
    ],

    list_daily_date: [
        {
            call: [/(\d{1,2})\/(\d{1,2})\/(\d+)/],
            goto: 'main',
            process: process.date('list_daily_note_date'),
            answer: `{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?date=$list_daily_note_date)}}`
        }
    ],

    list_daily_user: [
        {
            call: [/(\w+)/],
            normalize: false,
            goto: 'main',
            process: (state: Map<string, string>, match: RegExpExecArray) => {
                console.log('match ~>', match)
                process.raw('list_daily_note_user')(state, match)
            },
            answer: `{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?user=$list_daily_note_user)}}`
        }
    ],

    cr_help: [
        {
            call: ['listar', 'ver', 'mostrar'],
            goto: 'main',
            answer: `{{link(Clique aqui para ver os posts! 😃, ${SELF_HTTPS_HOST}/app-help-center.html)}}`
        },
        {
            call: ['adicionar', 'incluir', 'inserir'],
            goto: 'main',
            answer: NOT_IMPLEMENTED_ANSWER
        }
    ],

    login: [
        {
            goto: 'main',
            answer: NOT_IMPLEMENTED_ANSWER
        }
    ],

    understandnt: [
        {
            goto: 'main',
            answer: 'Hm... Desculpe, não entendi 😕'
        }
    ]
}
