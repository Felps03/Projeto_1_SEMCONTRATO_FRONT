System.register(["../../views/PostsView", "../../models/Posts"], function (exports_1, context_1) {
    "use strict";
    var PostsView_1, Posts_1, button, options, link, placeholder, helpView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PostsView_1_1) {
                PostsView_1 = PostsView_1_1;
            },
            function (Posts_1_1) {
                Posts_1 = Posts_1_1;
            }
        ],
        execute: function () {
            exports_1("button", button = (text) => `<button type="button" class="btn btn-sm btn-outline-warning float-right m-1 input-circle" data-value="${text}">${text}</button>`);
            exports_1("options", options = (...content) => {
                let html = '\n<div class="chatbot-options d-flex flex-row mt-1">';
                content.forEach(option => {
                    html += button(option);
                });
                html += '</div>';
                return html;
            });
            exports_1("link", link = (text, href) => `<a href="${href}" target="_blank">${text}</a>`);
            exports_1("placeholder", placeholder = (id) => `<div id=${id}></div>`);
            exports_1("helpView", helpView = (id, model) => {
                setTimeout(() => {
                    const postsView = new PostsView_1.PostsView('#' + id);
                    const parsedModel = JSON.parse(model);
                    const posts = Posts_1.Posts.from(parsedModel.slice(0, -1));
                    postsView.update(posts);
                    const chatBotHistory = document.getElementById('chatbot-history');
                    chatBotHistory.scrollTo(0, chatBotHistory.scrollHeight);
                }, 0);
                return `<div id=${id}></div>`;
            });
        }
    };
});
