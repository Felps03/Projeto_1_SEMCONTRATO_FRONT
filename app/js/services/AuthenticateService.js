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
                    return new Promise((resolve, reject) => {
                        fetch(`${index_1.HOST}users/authenticate`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "email": email,
                                "password": password,
                                "g-recaptcha-response": grecaptcha.getResponse()
                            })
                        }).then(res => {
                            if (res.status !== 200) {
                                return reject(res);
                            }
                            const token = res.headers.get("Token");
                            if (token != null) {
                                localStorage.setItem('tkn', token);
                            }
                            res.json()
                                .then((result) => {
                                localStorage.setItem('email', result[0]['email']);
                                localStorage.setItem('id', result[0]['_id']);
                                localStorage.setItem('isAdmin', result[0]['isAdmin']);
                                window.location.href = "index.html";
                                resolve();
                            });
                        });
                    });
                }
                resetPassword(email) {
                    return fetch(`${index_1.HOST}users/user/recover`, {
                        method: 'post',
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
                        method: 'post',
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
            };
            exports_1("AuthenticateService", AuthenticateService);
        }
    };
});
