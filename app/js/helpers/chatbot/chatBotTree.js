System.register(["./chatBotTemplates"], function (exports_1, context_1) {
    "use strict";
    var templates, NOT_IMPLEMENTED_ANSWER, dialog;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (templates_1) {
                templates = templates_1;
            }
        ],
        execute: function () {
            NOT_IMPLEMENTED_ANSWER = 'Hm... desculpa, não sei fazer isso ainda 😔';
            dialog = {
                'main': [
                    {
                        call: ['dailynote', 'daily'],
                        goto: 'cr_daily',
                        answer: `Ok. Sobre DailyNote, o que você quer fazer? ${templates.options({
                            'Listar': 'Listar',
                            'Adicionar': 'Adicionar',
                        })}`
                    },
                    {
                        call: ['helpcenter', 'help'],
                        goto: 'cr',
                        answer: `Ok. Sobre HelpCenter, o que você quer fazer? ${templates.options({
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
            };
            exports_1("default", dialog);
        }
    };
});
