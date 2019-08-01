System.register(["./chatBotProcess", "../../services/index", "../../models/Post", "../../utils/index", "../../validation/helpCenterValidate", "../../validation/dailyNoteValidate"], function (exports_1, context_1) {
    "use strict";
    var process, index_1, Post_1, index_2, valHelp, valDaily, BOT_NAME, NOT_IMPLEMENTED_ANSWER, SELF_HTTPS_HOST, helpCenterService, dailyNoteService, actualHours, greeting, mainBranch, dialog;
    var __moduleName = context_1 && context_1.id;
    function pseudoInput(val) {
        const input = document.createElement('input');
        input.value = val;
        return new index_2.InputWrapper(input);
    }
    return {
        setters: [
            function (process_1) {
                process = process_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (Post_1_1) {
                Post_1 = Post_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (valHelp_1) {
                valHelp = valHelp_1;
            },
            function (valDaily_1) {
                valDaily = valDaily_1;
            }
        ],
        execute: function () {
            BOT_NAME = 'Contratinho';
            NOT_IMPLEMENTED_ANSWER = ['Hm... desculpa, não sei fazer isso ainda 😔'];
            SELF_HTTPS_HOST = 'https://' + window.location.host;
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
                            process: async (state, match) => {
                                await process.checkLoggedIn('cr_daily')(state, match);
                                const resp = await dailyNoteService.registeredDaily(localStorage.getItem('id'));
                                if (resp.status === 400) {
                                    const respObj = await resp.json();
                                    state.set('_GOTO', 'cr_daily');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', respObj.erro || '']);
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
                            process: (state, match) => {
                                const yesterday = match[0];
                                const val = valDaily.yesterday(pseudoInput(yesterday));
                                if (val) {
                                    state.set('_GOTO', 'add_daily_yesterday');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', val]);
                                    return;
                                }
                                state.set('add_daily_yesterday', yesterday);
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
                            process: (state, match) => {
                                const today = match[0];
                                const val = valDaily.today(pseudoInput(today));
                                if (val) {
                                    state.set('_GOTO', 'add_daily_today');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', val]);
                                    return;
                                }
                                state.set('add_daily_today', today);
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
                            process: async (state, match) => {
                                const impediment = match[0];
                                const val = valDaily.impediment(pseudoInput(impediment));
                                if (val) {
                                    state.set('_GOTO', 'add_daily_impediment');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', val]);
                                    return;
                                }
                                const resp = await dailyNoteService.add(state.get('add_daily_yesterday'), state.get('add_daily_today'), impediment, null);
                                const possibleErrObj = await resp.json();
                                const possibleErrMsg = possibleErrObj.erro;
                                if (possibleErrMsg)
                                    state.set('_ANSWER', ['Algo de errado não deu certo 🤔', possibleErrMsg]);
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
                            process: (state, match) => {
                                const title = match[0];
                                const val = valHelp.title(pseudoInput(title));
                                if (val) {
                                    state.set('_GOTO', 'add_help_title');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', val]);
                                    return;
                                }
                                state.set('add_help_title', title);
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
                            process: async (state, match) => {
                                const desc = match[0];
                                const val = valHelp.desc(pseudoInput(desc));
                                if (val) {
                                    state.set('_GOTO', 'add_help_desc');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', val]);
                                    return;
                                }
                                const postToAdd = new Post_1.Post(state.get('add_help_title'), desc);
                                const resp = await helpCenterService.add(postToAdd);
                                const possibleErrObj = await resp.json();
                                const possibleErrMsg = possibleErrObj.erro;
                                if (possibleErrMsg)
                                    state.set('_ANSWER', ['Algo de errado não deu certo 🤔', possibleErrMsg]);
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
            });
        }
    };
});
