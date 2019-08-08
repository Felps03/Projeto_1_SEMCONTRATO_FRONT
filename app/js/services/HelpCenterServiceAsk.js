System.register(["../config/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, HelpCenterServiceAsk;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            HelpCenterServiceAsk = class HelpCenterServiceAsk {
                add(post) {
                    return fetch(`${index_1.HOST}helps/ask/`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        },
                        body: JSON.stringify({
                            "id_user": post.Author,
                            "desc": post.Desc,
                            "id_helpCenter": post.helpCenter
                        })
                    });
                }
                ;
                update(post, ID) {
                    return fetch(`${index_1.HOST}helps/ask/${ID}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        },
                        body: JSON.stringify({
                            "id_user": post.Author,
                            "desc": post.Desc,
                            "id_helpCenter": post.helpCenter
                        })
                    });
                }
                ;
                list(page) {
                    return fetch(`${index_1.HOST}helps/list/ask/${page}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
                remove(ID) {
                    return fetch(`${index_1.HOST}helps/ask/${ID}`, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
                findById(ID) {
                    return fetch(`${index_1.HOST}helps/ask/${ID}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
            };
            exports_1("HelpCenterServiceAsk", HelpCenterServiceAsk);
        }
    };
});
