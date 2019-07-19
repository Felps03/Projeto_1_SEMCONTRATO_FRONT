import * as templates from './chatBotTemplates'

type DialogBranch = {
    call?: string[]
    goto: string
    answer?: string
}

const NOT_IMPLEMENTED_ANSWER = 'Hm... desculpa, não sei fazer isso ainda 😔'

const dialog: { [node: string]: DialogBranch[] } = {
    'main': [
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
            goto: 'cr',
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
            goto: 'main'
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

export default dialog