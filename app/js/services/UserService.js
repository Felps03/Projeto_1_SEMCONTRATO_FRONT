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
                add(user) {
                    return fetch(`${index_1.HOST}users/user`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "name": user.Name,
                            "lastName": user.LastName,
                            "userName": user.UserName,
                            "email": user.Email,
                            "dateOfBirth": user.DateOfBirth,
                            "password": user.Password,
                            "g-recaptcha-response": grecaptcha.getResponse()
                        })
                    });
                }
                list() {
                    return fetch(`${index_1.HOST}admin/users`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                        }
                    });
                }
                update(user, ID, recaptchaON) {
                    let dateOfBirth = user.DateOfBirth.replace(/,/g, '-');
                    if (user.Password == '') {
                        return fetch(`${index_1.HOST}users/user/${ID}`, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                            },
                            body: JSON.stringify({
                                "name": user.Name,
                                "lastName": user.LastName,
                                "userName": user.UserName,
                                "email": user.Email,
                                "dateOfBirth": dateOfBirth,
                                "recaptcha": recaptchaON
                            })
                        });
                    }
                    else {
                        return fetch(`${index_1.HOST}users/user/${ID}`, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                            },
                            body: JSON.stringify({
                                "name": user.Name,
                                "lastName": user.LastName,
                                "userName": user.UserName,
                                "email": user.Email,
                                "dateOfBirth": dateOfBirth,
                                "password": user.Password
                            })
                        });
                    }
                }
                ;
                remove(ID) {
                    return fetch(`${index_1.HOST}users/user/${ID}`, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                        }
                    });
                }
                changePassword(email, password) {
                    return fetch(`${index_1.HOST}users/changePassword`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    });
                }
                findByEmail(email) {
                    return fetch(`${index_1.HOST}users/${email}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                        },
                    });
                }
                getData() {
                    const email = localStorage.getItem('email');
                    return fetch(`${index_1.HOST}users/${email}`, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`
                        },
                    });
                }
            };
            exports_1("UserService", UserService);
        }
    };
});
