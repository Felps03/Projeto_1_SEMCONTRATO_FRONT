System.register(["../config/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, ChatBotService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            ChatBotService = class ChatBotService {
                used() {
                    return fetch(`${index_1.HOST}score/usechatbot/`, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
                feedback(good, action) {
                    return fetch(`${index_1.HOST}score/rating/`, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        },
                        body: JSON.stringify({
                            evaluation: good,
                            action
                        })
                    });
                }
            };
            exports_1("ChatBotService", ChatBotService);
        }
    };
});
