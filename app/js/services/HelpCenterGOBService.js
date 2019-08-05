System.register(["../config/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, HelpCenterGOBService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            HelpCenterGOBService = class HelpCenterGOBService {
                list(page) {
                    return fetch(`${index_1.GOB_HOST}/helpcenter/atividade/${page}`, {
                        method: 'GET'
                    });
                }
                findByJoker(joker, page) {
                    return fetch(`${index_1.GOB_HOST}/helpcenter/query/${joker}/${page}`, {
                        method: 'GET'
                    });
                }
            };
            exports_1("HelpCenterGOBService", HelpCenterGOBService);
        }
    };
});
