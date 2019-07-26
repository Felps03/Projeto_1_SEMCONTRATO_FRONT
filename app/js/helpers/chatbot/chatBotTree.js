System.register(["./chatBotProcessEntities", "../../services/index", "../../utils/uuidv4"], function (exports_1, context_1) {
    "use strict";
    var process, index_1, uuidv4_1, BOT_NAME, NOT_IMPLEMENTED_ANSWER, SELF_HTTPS_HOST, helpCenterService, dailyNoteService, actualHours, greeting, mainBranch, dialog;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (process_1) {
                process = process_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (uuidv4_1_1) {
                uuidv4_1 = uuidv4_1_1;
            }
        ],
        execute: function () {
            BOT_NAME = 'Contratinho';
            NOT_IMPLEMENTED_ANSWER = ['Hm... desculpa, não sei fazer isso ainda 😔'];
            SELF_HTTPS_HOST = 'http://' + window.location.host;
            helpCenterService = new index_1.HelpCenterService();
            dailyNoteService = new index_1.DailyNoteService();
            actualHours = new Date().getHours();
            if (actualHours >= 4 && actualHours < 12) {
                greeting = 'Bom dia';
            }
            else if (actualHours < 20) {
                greeting = 'Boa tarde';
            }
            else {
                greeting = 'Boa noite';
            }
            exports_1("mainBranch", mainBranch = {
                greet: `${greeting}! Meu nome é ${BOT_NAME}, o assistente Sem Contrato 🙂`,
                goto: 'main'
            });
            exports_1("dialog", dialog = {
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
                            goto: 'main',
                            answer: NOT_IMPLEMENTED_ANSWER
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
                            process: process.date('list_daily_note_date')
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
                            process: process.raw('list_daily_note_user')
                        }
                    ]
                },
                cr_help: {
                    children: [
                        {
                            call: ['listar', 'ver', 'mostrar'],
                            goto: 'main',
                            answer: [
                                `{{helpView(list-help-id-$help_list_id, $help_list)}}`
                            ],
                            process: async (state, match) => {
                                state.set('help_list_id', uuidv4_1.default());
                                state.set('help_list', await helpCenterService.list(1)
                                    .then(res => res.json()));
                            }
                        },
                        {
                            call: ['adicionar', 'incluir', 'inserir'],
                            goto: 'main',
                            answer: NOT_IMPLEMENTED_ANSWER
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
            });
        }
    };
});
