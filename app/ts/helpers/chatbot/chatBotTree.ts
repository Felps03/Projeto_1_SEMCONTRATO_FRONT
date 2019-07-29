import * as process from './chatBotProcessEntities'
import { HelpCenterService, DailyNoteService } from '../../services/index';
import { Post } from '../../models/Post';
import { DailyNote } from '../../models/index';

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
    answer?: string[]

    // future
    artificialDelay?: boolean
    fetch?: string
}

export type Dialog = {
    // message to be sent upon arriving
    greet?: string[]

    // possible continuations
    children?: DialogBranch[]
}

const BOT_NAME = 'Contratinho'
const NOT_IMPLEMENTED_ANSWER = ['Hm... desculpa, não sei fazer isso ainda 😔']
const SELF_HTTPS_HOST = 'http://' + window.location.host

// initialiazing stuff
const helpCenterService = new HelpCenterService()
const dailyNoteService = new DailyNoteService()

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
    greet: `${greeting}! Meu nome é ${BOT_NAME}, o assistente Sem Contrato 🙂`,
    goto: 'main'
}

export const dialog: { [node: string]: Dialog } = {
    main: {
        greet: [
            'Como posso ajudar? 😊',
            '{{button(DailyNote)}}',
            '{{button(HelpCenter)}}',
            '{{button(Login)}}',
        ],

        children: [
            {
                call: ['dailynote', 'daily'],
                goto: 'cr_daily',
                answer: [
                    'Ok. Sobre DailyNote, o que você quer fazer?',
                    '{{button(Ver)}}',
                    '{{button(Adicionar)}}'
                ]
            },
            {
                call: ['helpcenter', 'help'],
                goto: 'cr_help',
                answer: [
                    'Ok. Sobre HelpCenter, o que você quer fazer?',
                    '{{button(Ver)}}',
                    '{{button(Adicionar)}}'
                ]
            },
            {
                call: ['login'],
                goto: 'main',
                answer: NOT_IMPLEMENTED_ANSWER
            }
        ]
    },

    cr_daily: {
        children: [
            {
                call: ['listar', 'ver', 'mostrar'],
                goto: 'list_daily',
                answer: [
                    'Gostaria de filtrar por data ou usuário?',
                    '{{button(Não)}}',
                    '{{button(Data)}}',
                    '{{button(Usuário)}}',
                ]
            },
            {
                call: ['adicionar', 'incluir', 'inserir'],
                goto: 'add_daily_yesterday',
                answer: ['O que você fez ontem? 😃']
            }
        ]
    },

    list_daily: {
        children: [
            {
                call: ['data', 'dia'],
                goto: 'list_daily_date',
                answer: ['Ok. Que dia? (formato dd/mm/aaaa)']
            },
            {
                call: ['usuario'],
                goto: 'list_daily_user',
                answer: ['Ok. Que usuário?']
            },
            {
                call: ['nao', 'nop'],
                goto: 'main',
                answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html)}}`]
            }
        ]
    },

    list_daily_date: {
        children: [
            {
                call: [/(\d{1,2})\/(\d{1,2})\/(\d+)/],
                goto: 'main',
                process: process.date('list_daily_note_date'),
                answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?date=$list_daily_note_date)}}`]
            }
        ]
    },

    list_daily_user: {
        children: [
            {
                call: [/(\w+)/],
                normalize: false,
                goto: 'main',
                process: process.raw('list_daily_note_user'),
                answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?user=$list_daily_note_user)}}`]
            }
        ]
    },

    add_daily_yesterday: {
        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'add_daily_today',
                process: process.raw('add_daily_yesterday', 0),
                answer: ['O que fará hoje? 🙂']
            }
        ]
    },

    add_daily_today: {
        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'add_daily_impediment',
                process: process.raw('add_daily_today', 0),
                answer: ['Algum impedimento? 🙂']
            }
        ]
    },

    add_daily_impediment: {
        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'main',
                process: (state: Map<string, any>, match: RegExpExecArray) => {
                    const impediment = match[0]

                    // const dailyToAdd = new DailyNote(
                    //     <string>state.get('add_daily_yesterday'),
                    //     <string>state.get('add_daily_today'),
                    //     impediment,
                    //     new Date()
                    // )

                    // dailyNoteService.add(dailyToAdd)
                    dailyNoteService.add(
                        <string>state.get('add_daily_yesterday'),
                        <string>state.get('add_daily_today'),
                        impediment,
                        null // inst used anyway
                    )
                },
                answer: ['Daily registrada com sucesso!']
            }
        ]
    },

    cr_help: {
        children: [
            {
                call: ['listar', 'ver', 'mostrar'],
                goto: 'main',
                answer: [`{{link(Clique aqui para ver os posts! 😃, ${SELF_HTTPS_HOST}/app-help-center.html)}}`]
            },
            {
                call: ['adicionar', 'incluir', 'inserir'],
                goto: 'add_help_title',
                answer: ['Qual o seu problema? 😋 (título)']
            }
        ]
    },

    add_help_title: {
        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'add_help_desc',
                process: process.raw('add_help_title', 0),
                answer: ['O que tem a dizer sobre o problema? 🙂']
            }
        ]
    },

    add_help_desc: {
        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'main',
                process: (state: Map<string, any>, match: RegExpExecArray) => {
                    const desc = match[0]

                    const postToAdd = new Post(<string>state.get('add_help_title'), desc)

                    helpCenterService.add(postToAdd)
                },
                answer: ['Adicionado com sucesso!']
            }
        ]
    },

    login: {
        children: [
            {
                goto: 'main',
                answer: NOT_IMPLEMENTED_ANSWER
            }
        ]
    },

    understandnt: {
        children: [
            {
                goto: 'main',
                answer: ['Hm... Desculpe, não entendi 😕']
            }
        ]
    }
}
