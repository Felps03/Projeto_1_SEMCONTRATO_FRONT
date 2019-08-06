System.register(["../config/index", "../utils/dateGOB"], function (exports_1, context_1) {
    "use strict";
    var index_1, dateGOB_1, DailyNoteGOBService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (dateGOB_1_1) {
                dateGOB_1 = dateGOB_1_1;
            }
        ],
        execute: function () {
            DailyNoteGOBService = class DailyNoteGOBService {
                list(date) {
                    return fetch(`${index_1.GOB_HOST}daily/data`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "filtro": dateGOB_1.dateGOB(date)
                        })
                    });
                }
            };
            exports_1("DailyNoteGOBService", DailyNoteGOBService);
        }
    };
});
