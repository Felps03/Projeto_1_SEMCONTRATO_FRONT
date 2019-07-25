System.register(["../config/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, HelpCenterService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            HelpCenterService = class HelpCenterService {
                add(post) {
                    return fetch(`${index_1.HOST}helps/post/`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        },
                        body: JSON.stringify({
                            "title": post.Title,
                            "desc": post.Desc,
                            "id_user": localStorage.getItem('id')
                        })
                    });
                }
                ;
                update(post, ID) {
                    return fetch(`${index_1.HOST}helps/post/${ID}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        },
                        body: JSON.stringify({
                            "id_user": localStorage.getItem('id'),
                            "title": post.Title,
                            "desc": post.Desc
                        })
                    });
                }
                ;
                list(page) {
                    return fetch(`${index_1.HOST}helps/list/post/${page}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
                listLastHelp() {
                    return fetch(`${index_1.HOST}helps/last/`, {
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
                    return fetch(`${index_1.HOST}helps/post/${ID}`, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        }
                    });
                }
                findByJoker(joker, page) {
                    return fetch(`${index_1.HOST}helps/list/joker/${page}`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                            'id_user': localStorage.getItem('id')
                        },
                        body: JSON.stringify({
                            "joker": joker
                        })
                    });
                }
            };
            exports_1("HelpCenterService", HelpCenterService);
        }
    };
});
