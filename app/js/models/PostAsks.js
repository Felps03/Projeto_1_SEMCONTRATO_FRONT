System.register(["./index"], function (exports_1, context_1) {
    "use strict";
    var index_1, PostAsks;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            PostAsks = class PostAsks {
                constructor() {
                    this._postAsks = [];
                }
                add(postAsk) {
                    this._postAsks.push(postAsk);
                }
                toArray() {
                    return [].concat(this._postAsks);
                }
                static from(arr) {
                    const newPostAsks = new PostAsks();
                    arr.forEach((val) => {
                        newPostAsks.add(new index_1.PostAsk(val.id_helpCenter, val.desc, val.id_user, val.owner, val._id));
                    });
                    return newPostAsks;
                }
            };
            exports_1("PostAsks", PostAsks);
        }
    };
});
