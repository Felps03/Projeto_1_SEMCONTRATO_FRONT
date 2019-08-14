System.register(["./chatBotProcess", "../../services/index", "../../models/Post", "../../utils/index", "../../validation/helpCenterValidate", "../../validation/dailyNoteValidate", "../../utils/toISODate"], function (exports_1, context_1) {
    "use strict";
    var process, index_1, Post_1, index_2, valHelp, valDaily, toISODate_1, BOT_NAME, NOT_IMPLEMENTED_ANSWER, SELF_HTTPS_HOST, helpCenterService, dailyNoteService, userService, actualHours, greeting, mainBranch, dialog;
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
            },
            function (toISODate_1_1) {
                toISODate_1 = toISODate_1_1;
            }
        ],
        execute: function () {
            BOT_NAME = 'Contratinho';
            NOT_IMPLEMENTED_ANSWER = ['Hm... desculpa, não sei fazer isso ainda 😔'];
            SELF_HTTPS_HOST = 'https://' + window.location.host;
            helpCenterService = new index_1.HelpCenterService();
            dailyNoteService = new index_1.DailyNoteService();
            userService = new index_1.UserService();
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
                    greet: [
                        'Gostaria de filtrar por?..',
                        async () => {
                            const dailies = await dailyNoteService.listDate(toISODate_1.toISODate(new Date()), 1).then(res => res.json());
                            console.log(dailies);
                            if (dailies.length > 1) {
                                return '{{button(Ver dailies de hoje)}}';
                            }
                            else {
                                return '(Nenhuma daily cadastrada hoje ainda)';
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
                            goto: 'main',
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
                            goto: 'main',
                            answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?date=$list_daily_note_date)}}`],
                            process: async (state, match) => {
                                const dateSlot = 'list_daily_note_date';
                                process.entDate(dateSlot)(state, match);
                                const date = state.get(dateSlot);
                                const result = await dailyNoteService.listDate(date, 1);
                                const readableResult = await result.json();
                                if (readableResult.length <= 1) {
                                    state.set('_GOTO', 'main');
                                    state.set('_ANSWER', [
                                        `Não existe nenhuma daily cadastrada pra essa data, nem tem por que ir lá.`,
                                        `Mas o link é {{link(esse, ${SELF_HTTPS_HOST}/app-daily-note.html?date=${date})}} anyway`
                                    ]);
                                    return;
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
                            goto: 'main',
                            answer: [`{{link(Clique aqui para ver as dailies! 😃, ${SELF_HTTPS_HOST}/app-daily-note.html?user=$list_daily_note_user)}}`],
                            process: async (state, match) => {
                                const userName = match[1];
                                const status = (await userService.checkIfExists(userName)).status;
                                if (status === 204) {
                                    state.set('_GOTO', 'list_daily_user');
                                    state.set('_ANSWER', [
                                        'Algo de errado não está certo 🤔',
                                        `Usuário ${userName} não está cadastrado.`
                                    ]);
                                    return;
                                }
                                const result = await dailyNoteService.listUser(userName, 1);
                                const readableResult = await result.json();
                                if (readableResult.length === 0) {
                                    state.set('_GOTO', 'main');
                                    state.set('_ANSWER', [
                                        `Não existe nenhuma daily cadastrada pra esse usuário, nem tem por que ir lá.`,
                                        `Mas o link é {{link(esse, ${SELF_HTTPS_HOST}/app-daily-note.html?user=${userName})}} anyway`
                                    ]);
                                    return;
                                }
                                process.entRaw('list_daily_note_user')(state, match);
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
                            process: (state, match) => {
                                const yesterday = match[0];
                                const val = valDaily.yesterday(pseudoInput(yesterday));
                                if (val) {
                                    state.set('_GOTO', 'add_daily_yesterday');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', val]);
                                    return;
                                }
                                state.set('add_daily_yesterday', yesterday);
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
                            process: (state, match) => {
                                const today = match[0];
                                const val = valDaily.today(pseudoInput(today));
                                if (val) {
                                    state.set('_GOTO', 'add_daily_today');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', val]);
                                    return;
                                }
                                state.set('add_daily_today', today);
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
                    greet: [
                        'Ok. Sobre HelpCenter, o que você quer fazer?',
                        '{{button(Ver)}}',
                        '{{button(Adicionar)}}'
                    ],
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
                            process: (state, match) => {
                                const title = match[0];
                                const val = valHelp.title(pseudoInput(title));
                                if (val) {
                                    state.set('_GOTO', 'add_help_title');
                                    state.set('_ANSWER', ['Algo de errado não está certo 🤔', val]);
                                    return;
                                }
                                state.set('add_help_title', title);
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
                    greet: ['Hm... Desculpe, não entendi 😕']
                }
            });
        }
    };
});
