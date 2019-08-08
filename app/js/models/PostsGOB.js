System.register(["./index"], function (exports_1, context_1) {
    "use strict";
    var index_1, PostsGOB;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            PostsGOB = class PostsGOB {
                constructor() {
                    this._posts = [];
                }
                add(post) {
                    this._posts.push(post);
                }
                toArray() {
                    return [].concat(this._posts);
                }
                get(i) {
                    return this._posts[i];
                }
                static from(arr) {
                    const newPostGOBs = new PostsGOB();
                    arr.forEach((val) => {
                        newPostGOBs.add(new index_1.PostGOB(val.titulo, val.corpo, val.username, val.data, val.imagem, val.numeroLikes, val.tags[0], val.resolvido, val._id));
                    });
                    return newPostGOBs;
                }
            };
            exports_1("PostsGOB", PostsGOB);
        }
    };
});
