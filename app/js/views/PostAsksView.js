System.register(["./View", "./PostAskView"], function (exports_1, context_1) {
    "use strict";
    var View_1, PostAskView_1, PostAsksView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (PostAskView_1_1) {
                PostAskView_1 = PostAskView_1_1;
            }
        ],
        execute: function () {
            PostAsksView = class PostAsksView extends View_1.View {
                constructor(selector, escape = false) {
                    super(selector, escape);
                }
                template(model) {
                    return `
        <div class="container" id="post-ask-inner-list">
            ${model.toArray().map((_, i) => `
                <div id="comment-${i}"></div>
            `).join('')}
        </div>
        `;
                }
                update(model) {
                    super.update(model);
                    const postList = document.getElementById('post-ask-inner-list');
                    if (postList) {
                        Array.from(postList.children).forEach((el, i) => {
                            const view = new PostAskView_1.PostAskView(`#${el.getAttribute('id') || ''}`);
                            const postAsk = model.toArray()[i];
                            view.update(postAsk);
                            view.didMount(this.childrenDidMountFn.bind(view));
                        });
                    }
                }
                childrenDidMount(fn) {
                    this.childrenDidMountFn = fn;
                }
            };
            exports_1("PostAsksView", PostAsksView);
        }
    };
});
