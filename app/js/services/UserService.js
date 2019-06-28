System.register(["../config/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, UserService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            UserService = class UserService {
                cadastro(usuario) {
                    const form = document.getElementById('user-register');
                    let formData = new FormData(form);
                    $.ajax({
                        type: 'POST',
                        url: `${index_1.HOST}users/user`,
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
                lista() {
                    $.ajax({
                        type: 'GET',
                        url: `${index_1.HOST}users`,
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
                editar(id) {
                    const form = document.getElementById('user-edit');
                    let formData = new FormData(form);
                    $.ajax({
                        type: 'PUT',
                        url: `${index_1.HOST}users/user/${id}`,
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
                remove(id) {
                    $.ajax({
                        type: 'DELETE',
                        url: `${index_1.HOST}users/user/${id}`,
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
                changePassword(email, password) {
                    const form = document.getElementById('recovery-code-form');
                    let formData = new FormData(form);
                    $.ajax({
                        type: 'PUT',
                        url: `${index_1.HOST}users/changePassword`,
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
                findByEmail(email) {
                    $.ajax({
                        type: 'GET',
                        url: `${index_1.HOST}users/${email}`,
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
            };
            exports_1("UserService", UserService);
        }
    };
});
