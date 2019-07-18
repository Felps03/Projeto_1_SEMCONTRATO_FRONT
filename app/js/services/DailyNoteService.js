System.register(["../config/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, DailyNoteService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            DailyNoteService = class DailyNoteService {
                add(yesterday, today, impediment, date) {
                    return fetch(`${index_1.HOST}dailys/daily`, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        },
                        body: JSON.stringify({
                            "yesterday": yesterday,
                            "today": today,
                            "impediment": impediment,
                            "date": new Date().toISOString().slice(0, 10),
                            "email": localStorage.getItem('email')
                        })
                    });
                }
                update(daily, ID) {
                    return fetch(`${index_1.HOST}dailys/daily/${ID}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        },
                        body: JSON.stringify({
                            "id_user": localStorage.getItem('id'),
                            "yesterday": daily.Yesterday,
                            "today": daily.Today,
                            "impediment": daily.Impediment,
                            "date": daily.Date
                        })
                    });
                }
                ;
                listDate(data, page) {
                    return fetch(`${index_1.HOST}dailys/daily/${data}/1`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
                listAll() {
                    return fetch(`${index_1.HOST}dailys`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
                listDailyById(id) {
                    return fetch(`${index_1.HOST}dailys/${id}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
                registeredDaily(id) {
                    return fetch(`${index_1.HOST}dailys/user/${id}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('tkn')}`
                        }
                    });
                }
            };
            exports_1("DailyNoteService", DailyNoteService);
        }
    };
});
