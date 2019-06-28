System.register(["../config/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, AuthenticateService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            AuthenticateService = class AuthenticateService {
                authenticate(email, password) {
                    const form = document.getElementById('login-form');
                    let formData = new FormData(form);
                    $.ajax({
                        type: 'POST',
                        url: `${index_1.HOST}users/authenticate`,
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
                resetPassword(email) {
                    const form = document.getElementById('recovery-pass-form');
                    let formData = new FormData(form);
                    $.ajax({
                        type: 'POST',
                        url: `${index_1.HOST}users/user/recover`,
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
                verifyCode(codigo, email) {
                    const form = document.getElementById('recovery-code-form');
                    let formData = new FormData(form);
                    $.ajax({
                        type: 'POST',
                        url: `${index_1.HOST}users/code/verify`,
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
            };
            exports_1("AuthenticateService", AuthenticateService);
        }
    };
});
