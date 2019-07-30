System.register(["./index"], function (exports_1, context_1) {
    "use strict";
    var index_1, Posts;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            Posts = class Posts {
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
                    const newPosts = new Posts();
                    arr.forEach((val) => {
                        newPosts.add(new index_1.Post(val.title, val.desc, val.id_user, val.owner, val.date, val._id));
                    });
                    return newPosts;
                }
            };
            exports_1("Posts", Posts);
        }
    };
});
