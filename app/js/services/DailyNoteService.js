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
                add(form) {
                    let formData = new FormData(form);
                    $.ajax({
                        type: 'POST',
                        url: `${index_1.HOST}dailys/daily`,
                        contentType: false,
                        cache: false,
                        processData: false,
                        data: formData,
                        success: function (data) { console.log(data); },
                        error: function (request, status, error) {
                            console.log("error: ", error);
                            console.log("resquest: ", request.responseText);
                        }
                    });
                }
                update(id) {
                    const form = document.getElementById('editdaily-form');
                    let formData = new FormData(form);
                    $.ajax({
                        type: 'PUT',
                        url: `${index_1.HOST}dailys/daily/${id}`,
                        contentType: false,
                        cache: false,
                        processData: false,
                        data: formData,
                        success: function (data) { console.log(data); },
                        error: function (request, status, error) {
                            console.log("error: ", error);
                            console.log("resquest: ", request.responseText);
                        }
                    });
                }
                listDate(data) {
                    $.ajax({
                        type: 'GET',
                        url: `${index_1.HOST}dailys/daily/${data}`,
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function (data) { console.log(data); },
                        error: function (request, status, error) {
                            console.log("error: ", error);
                            console.log("resquest: ", request.responseText);
                        }
                    });
                }
                listAll() {
                    let result = "";
                    $.ajax({
                        type: 'GET',
                        url: `${index_1.HOST}dailys`,
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function (data) {
                            result = data;
                            console.log(data);
                        },
                        error: function (request, status, error) {
                            console.log("error: ", error);
                            console.log("resquest: ", request.responseText);
                        }
                    });
                    return result;
                }
            };
            exports_1("DailyNoteService", DailyNoteService);
        }
    };
});
