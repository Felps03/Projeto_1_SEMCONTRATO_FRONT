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
                    return fetch(`${index_1.HOST}users/authenticate`, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    }).then(res => {
                        const token = res.headers.get("Token");
                        if (token != null) {
                            localStorage.setItem('tkn', token);
                        }
                        return res.json();
                    }).then(result => {
                        console.log(result);
                        localStorage.setItem('email', result[0]['email']);
                        localStorage.setItem('id', result[0]['_id']);
                        localStorage.setItem('isAdmin', result[0]['isAdmin']);
                        window.location.href = "home.html";
                    });
                }
                resetPassword(email) {
                    return fetch(`${index_1.HOST}users/user/recover`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "email": email
                        })
                    });
                }
                verifyCode(emailCode, email, password) {
                    return fetch(`${index_1.HOST}users/code/verify`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "emailCode": emailCode,
                            "email": email
                        })
                    }).catch(err => {
                        console.log(err);
                        return err;
                    });
                }
                logout() {
                    return fetch(`${index_1.HOST}users/logout`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("tkn")}`
                        },
                    }).then(res => {
                        if (res.status == 400) {
                            alert("Houve um erro ao Deslogar");
                        }
                        if (res.status == 200) {
                            localStorage.removeItem("tkn");
                            localStorage.removeItem("email");
                            localStorage.removeItem("id");
                            window.location.href = 'index.html';
                        }
                    }).catch(error => {
                        console.log("error: ", error);
                        return error;
                    });
                }
            };
            exports_1("AuthenticateService", AuthenticateService);
        }
    };
});
