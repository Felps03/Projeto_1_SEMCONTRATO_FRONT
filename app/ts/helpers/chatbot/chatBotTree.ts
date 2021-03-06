import * as process from './chatBotProcess'
import { DailyNoteService, HelpCenterService } from "../../services/index";
import { DailyNotesView } from '../../views/DailyNotesView';
import { PostsView } from '../../views/PostsView';
import uuidv4 from '../../utils/uuidv4'
import { Post } from '../../models/Post';
import { InputWrapper } from '../../utils/index';
import * as valHelp from '../../validation/helpCenterValidate'
import * as valDaily from '../../validation/dailyNoteValidate'
import { DailyNote } from '../../models/index';

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
    greet?: string[]

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
            // '{{button(Login)}}',
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
            }
            // {
            //     call: ['login'],
            //     goto: 'main',
            //     answer: NOT_IMPLEMENTED_ANSWER,
            //     process: process.checkNotLoggedIn('main')
            // }
        ]
    },

    cr_daily: {
        children: [
            {
                call: ['listar', 'ver', 'mostrar'],
                goto: 'list_daily',
                answer: [
                    'Gostaria de filtrar por?..',
                    '{{button(Ver dailies de hoje)}}',
                    '{{button(Outra data)}}',
                    '{{button(Usuário)}}',
                ]
            },
            {
                call: ['adicionar', 'incluir', 'inserir'],
                goto: 'add_daily_yesterday',
                answer: ['O que você fez ontem? 😃'],
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
                call: ['nao', 'nop', 'hoje'],
                goto: 'main',
                answer: [
                    `{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html)}}`,
                ],
            }
        ]
    },

    list_daily_date: {
        children: [
            {
                call: [/(\d{1,2})\/(\d{1,2})\/(\d+)/],
                goto: 'main',
                answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?date=$list_daily_note_date)}}`],
                process: process.entDate('list_daily_note_date')
            }
        ]
    },

    list_daily_user: {
        children: [
            {
                call: [/(\w+)/],
                normalize: false,
                goto: 'main',
                answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?user=$list_daily_note_user)}}`],
                process: process.entRaw('list_daily_note_user')
            }
        ]
    },

    add_daily_yesterday: {
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
                },
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
                },
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
                process: async (state: Map<string, any>, match: RegExpExecArray) => {
                    const impediment = match[0]

                    // const dailyToAdd = new DailyNote(
                    //     <string>state.get('add_daily_yesterday'),
                    //     <string>state.get('add_daily_today'),
                    //     impediment,
                    //     new Date()
                    // )

                    const val = valDaily.impediment(pseudoInput(impediment))
                    // means gone wrong
                    if (val) {
                        state.set('_GOTO', 'add_daily_impediment')
                        state.set('_ANSWER', ['Algo de errado não está certo 🤔', val])
                        return
                    }

                    // dailyNoteService.add(dailyToAdd)
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
        children: [
            {
                call: ['listar', 'ver', 'mostrar'],
                goto: 'main',
                // answer: [
                //     `{{helpView(list-help-id-$help_list_id, $help_list)}}`
                // ],
                // process: async (state: Map<string, any>, match: RegExpExecArray) => {
                //     state.set('help_list_id', uuidv4())
                //     state.set('help_list',
                //         await helpCenterService.list(1, null)
                //             .then(res => res.json())
                //     )
                // }
                answer: [
                    `{{link(Clique aqui para ver os posts! 😃, ${SELF_HTTPS_HOST}/app-help-center.html)}}`,
                ]
            },
            {
                call: ['adicionar', 'incluir', 'inserir'],
                goto: 'add_help_title',
                process: process.checkLoggedIn('cr_help'),
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
                },
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
