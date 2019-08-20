import * as process from './chatBotProcess'
import { DailyNoteService, HelpCenterService, UserService, ChatBotService } from "../../services/index";
import { Post } from '../../models/Post';
import { InputWrapper } from '../../utils/index';
import * as valHelp from '../../validation/helpCenterValidate'
import * as valDaily from '../../validation/dailyNoteValidate'
import { toISODate } from '../../utils/toISODate';

export type DialogBranch = {
    // go into branch if one call matches
    call?: string[] | RegExp[]
    // whether to normalize the input for better matching
    normalize?: boolean
    // the branch to go
    goto?: string

    // what to say when entering branch
    answer?: (string | ((state: Map<string, any>) => (string | null | Promise<string | null>)))[]

    // how to process the regexp match (likely to be
    // related with entities)
    process?: (state: Map<string, any>, match: RegExpExecArray) => void

    // future
    artificialDelay?: boolean
}

export type Dialog = {
    // message to be sent upon arriving
    greet?: (string | ((state: Map<string, any>) => (string | null | Promise<string | null>)))[]

    // possible continuations
    children?: DialogBranch[]

    // if present, the conversation will flow to the
    // specified branch without looking for "call"s
    flow?: string

    // processing to be done upon reaching the branch
    process?: (state: Map<string, any>) => void
}

// config
const BOT_NAME = 'Contratinho'
const NOT_IMPLEMENTED_ANSWER = ['Hm... desculpa, não sei fazer isso ainda 😔']
const SELF_HTTPS_HOST = 'https://' + window.location.host

// initialiazing stuff
const helpCenterService = new HelpCenterService()
const dailyNoteService = new DailyNoteService()
const userService = new UserService()
const chatBotService = new ChatBotService()

// greeting mechanics
const actualHours = new Date().getHours()
let greeting

if (actualHours >= 4 && actualHours < 12) {
    greeting = 'Bom dia'
} else if (actualHours < 20) {
    greeting = 'Boa tarde'
} else {
    greeting = 'Boa noite'
}

// TEMPORARY util
function pseudoInput(val: string) {
    const input = document.createElement('input')
    input.value = val
    return new InputWrapper(input)
}

// starting dialog
export const mainBranch = {
    greet: `${greeting}! Meu nome é ${BOT_NAME}, o assistente Sem Contrato 🙂`,
    goto: 'main'
}

// dialog afterwards
export const dialog: { [node: string]: Dialog } = {
    main: {

        greet: [
            'Como posso ajudar? 😊',
            '{{button(DailyNote)}}',
            '{{button(HelpCenter)}}',
        ],

        children: [
            {
                call: ['dailynote', 'daily'],
                goto: 'cr_daily'
            },
            {
                call: ['helpcenter', 'help'],
                goto: 'cr_help'
            }
        ]
    },

    cr_daily: {

        greet: [
            'Ok. Sobre DailyNote, o que você quer fazer?',
            '{{button(Ver)}}',
            '{{button(Adicionar)}}'
        ],

        children: [
            {
                call: ['listar', 'ver', 'mostrar'],
                goto: 'list_daily'
            },
            {
                call: ['adicionar', 'incluir', 'inserir'],
                goto: 'add_daily_yesterday',
                process: async (state: Map<string, any>, match: RegExpExecArray) => {
                    await process.checkLoggedIn('cr_daily')(state, match)

                    const resp = await dailyNoteService.registeredDaily(localStorage.getItem('id'))
                    if (resp.status === 400) {
                        const respObj = await resp.json()
                        state.set('_GOTO', 'cr_daily')
                        state.set('_ANSWER', ['Algo de errado não está certo 🤔', respObj.erro || ''])
                    }
                }
            }
        ]
    },

    list_daily: {

        greet: [
            'Gostaria de filtrar por?..',
            async () => {
                const dailies = await dailyNoteService.listDate(toISODate(new Date()), 1).then(res => res.json())
                console.log(dailies)
                if (dailies.length > 1) { // because of the totalPages and stuff item
                    return '{{button(Ver dailies de hoje)}}'
                } else {
                    return '(Nenhuma daily cadastrada hoje ainda)'
                }
            },
            '{{button(Data)}}',
            '{{button(Usuário)}}',
        ],

        children: [
            {
                call: ['data', 'dia'],
                goto: 'list_daily_date'
            },
            {
                call: ['usuario'],
                goto: 'list_daily_user'
            },
            {
                call: ['nao', 'nop', 'hoje'],
                // goto: 'main',
                goto: 'was_i_helpful',
                answer: [
                    `{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html)}}`,
                ],
            }
        ]
    },

    list_daily_date: {

        greet: ['Ok. Que dia? (formato dd/mm/aaaa)'],

        children: [
            {
                call: [/(\d{1,2})\/(\d{1,2})\/(\d+)/],
                goto: 'was_i_helpful',
                answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?date=$list_daily_note_date)}}`],
                process: async (state: Map<string, any>, match: RegExpExecArray) => {

                    const dateSlot = 'list_daily_note_date'

                    process.entDate(dateSlot)(state, match)
                    const date = state.get(dateSlot)

                    const result = await dailyNoteService.listDate(date, 1)
                    const readableResult = await result.json()

                    if (readableResult.length <= 1) {
                        state.set('_GOTO', 'main')
                        state.set('_ANSWER', [
                            `Não existe nenhuma daily cadastrada pra essa data, nem tem por que ir lá.`,
                            `Mas o link é {{link(esse, ${SELF_HTTPS_HOST}/app-daily-note.html?date=${date})}} anyway`
                        ])
                        return
                    }

                }
            }
        ]
    },

    list_daily_user: {

        greet: ['Ok. Que usuário?'],

        children: [
            {
                call: [/^((?:[A-Za-z0-9]|_|\-|\.)+)$/],
                normalize: false,
                goto: 'was_i_helpful',
                answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?user=$list_daily_note_user)}}`],
                process: async (state: Map<string, any>, match: RegExpExecArray) => {

                    const userName = match[1]
                    const status = (await userService.checkIfExists(userName)).status

                    if (status === 204) {
                        state.set('_GOTO', 'list_daily_user')
                        state.set('_ANSWER', [
                            'Algo de errado não está certo 🤔',
                            `Usuário ${userName} não está cadastrado.`
                        ])
                        return
                    }

                    const result = await dailyNoteService.listUser(userName, 1)
                    const readableResult = await result.json()

                    if (readableResult.length === 0) {
                        state.set('_GOTO', 'main')
                        state.set('_ANSWER', [
                            `Não existe nenhuma daily cadastrada pra esse usuário, nem tem por que ir lá.`,
                            `Mas o link é {{link(esse, ${SELF_HTTPS_HOST}/app-daily-note.html?user=${userName})}} anyway`
                        ])
                        return
                    }

                    process.entRaw('list_daily_note_user')(state, match)
                }
            }
        ]
    },

    add_daily_yesterday: {

        greet: ['O que você fez ontem? 😃'],

        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'add_daily_today',
                process: (state: Map<string, any>, match: RegExpExecArray) => {
                    // PROCESSING TITLE
                    const yesterday = match[0]

                    const val = valDaily.yesterday(pseudoInput(yesterday))
                    // means gone wrong
                    if (val) {
                        state.set('_GOTO', 'add_daily_yesterday')
                        state.set('_ANSWER', ['Algo de errado não está certo 🤔', val])
                        return
                    }

                    state.set('add_daily_yesterday', yesterday)
                }
            }
        ]
    },

    add_daily_today: {

        greet: ['O que fará hoje? 🙂'],

        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'add_daily_impediment',
                process: (state: Map<string, any>, match: RegExpExecArray) => {
                    // PROCESSING TITLE
                    const today = match[0]

                    const val = valDaily.today(pseudoInput(today))
                    // means gone wrong
                    if (val) {
                        state.set('_GOTO', 'add_daily_today')
                        state.set('_ANSWER', ['Algo de errado não está certo 🤔', val])
                        return
                    }

                    state.set('add_daily_today', today)
                }
            }
        ]
    },

    add_daily_impediment: {

        greet: ['Algum impedimento? 🙂'],

        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'was_i_helpful',
                process: async (state: Map<string, any>, match: RegExpExecArray) => {
                    const impediment = match[0]

                    const val = valDaily.impediment(pseudoInput(impediment))
                    // means gone wrong
                    if (val) {
                        state.set('_GOTO', 'add_daily_impediment')
                        state.set('_ANSWER', ['Algo de errado não está certo 🤔', val])
                        return
                    }

                    const resp = await dailyNoteService.add(
                        <string>state.get('add_daily_yesterday'),
                        <string>state.get('add_daily_today'),
                        impediment,
                        null // inst used anyway
                    )

                    const possibleErrObj = await resp.json()
                    const possibleErrMsg = possibleErrObj.erro
                    if (possibleErrMsg)
                        state.set('_ANSWER', ['Algo de errado não deu certo 🤔', possibleErrMsg])

                },
                answer: ['Daily registrada com sucesso!']
            }
        ]
    },

    cr_help: {

        greet: [
            'Ok. Sobre HelpCenter, o que você quer fazer?',
            '{{button(Ver)}}',
            '{{button(Adicionar)}}'
        ],

        children: [
            {
                call: ['listar', 'ver', 'mostrar'],
                goto: 'was_i_helpful',
                answer: [
                    `{{link(Clique aqui para ver os posts! 😃, ${SELF_HTTPS_HOST}/app-help-center.html)}}`,
                ]
            },
            {
                call: ['adicionar', 'incluir', 'inserir'],
                goto: 'add_help_title',
                process: process.checkLoggedIn('cr_help')
            }
        ]
    },

    add_help_title: {

        greet: ['Qual o seu problema? 😋 (título)'],

        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'add_help_desc',
                process: (state: Map<string, any>, match: RegExpExecArray) => {
                    // PROCESSING TITLE
                    const title = match[0]

                    const val = valHelp.title(pseudoInput(title))
                    // means gone wrong
                    if (val) {
                        state.set('_GOTO', 'add_help_title')
                        state.set('_ANSWER', ['Algo de errado não está certo 🤔', val])
                        return
                    }

                    state.set('add_help_title', title)
                }
            }
        ]
    },

    add_help_desc: {

        greet: ['O que tem a dizer sobre o problema? 🙂'],

        children: [
            {
                call: [/^.*$/],
                normalize: false,
                goto: 'was_i_helpful',
                process: async (state: Map<string, any>, match: RegExpExecArray) => {
                    // PROCESSING DESC
                    const desc = match[0]

                    const val = valHelp.desc(pseudoInput(desc))
                    // means gone wrong
                    if (val) {
                        state.set('_GOTO', 'add_help_desc')
                        state.set('_ANSWER', ['Algo de errado não está certo 🤔', val])
                        return
                    }

                    const postToAdd = new Post(<string>state.get('add_help_title'), desc)

                    const resp = await helpCenterService.add(postToAdd)

                    const possibleErrObj = await resp.json()
                    const possibleErrMsg = possibleErrObj.erro
                    if (possibleErrMsg)
                        state.set('_ANSWER', ['Algo de errado não deu certo 🤔', possibleErrMsg])
                },
                answer: ['Adicionado com sucesso!']
            }
        ]
    },

    was_i_helpful: {

        greet: [
            'Consegui te ajudar? 😋',
            '{{button(Sim)}}',
            '{{button(Não)}}'
        ],

        children: [
            {
                call: ['s'],
                goto: 'main',
                answer: ['Que bom! 🙂'],
                process: (state: Map<string, any>, match: RegExpMatchArray) => {
                    const withoutLast = /.*(?=\.)/.exec(state.get('_PATH'))[0]
                    chatBotService.feedback(true, withoutLast)
                }
            },
            {
                call: ['n'],
                goto: 'main',
                answer: ['Hm... Espero melhorar no futuro. 🤔'],
                process: (state: Map<string, any>, match: RegExpMatchArray) => {
                    const withoutLast = /.*(?=\.)/.exec(state.get('_PATH'))[0]
                    chatBotService.feedback(false, withoutLast)
                }
            },
        ]
    },

    understandnt: {
        greet: ['Hm... Desculpe, não entendi 😕']
    }
}
