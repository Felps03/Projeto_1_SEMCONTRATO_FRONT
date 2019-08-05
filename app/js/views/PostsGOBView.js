System.register(["./View", "../config/index"], function (exports_1, context_1) {
    "use strict";
    var View_1, index_1, PostsGOBView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            PostsGOBView = class PostsGOBView extends View_1.View {
                template(model) {
                    return `
        <div class="container">
            ${model.toArray().map((post, i) => `
            <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3 ${post.Solved ? 'border border-success' : ''}">
                <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                    <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                        <div>
                            <img class="rounded-circle" width="70" src="${post.Photo ? `${index_1.GOB_HOST}public/uploads/${post.Photo}` : `${index_1.GOB_HOST}public/img/user.png`}" alt="Card image cap">
                            <h5 class="mt-2 mb-2">${post.AuthorName ? post.AuthorName : ""}</h5>
                            <p class="mt-2 mb-2">${post.Date}</p>
                        </div>
                        <a href="http://gob-dev.azurewebsites.net/helpCenter/topico/${post.Id}" target="_blank">
                            <button class="btn btn-default btn-sm btn-info">
                                <i class="material-icons"> forum </i>
                            </button>
                        </a>

                    </div>
                </div>
                <div class="col-md-9 col-12 card-body">

                    <div class="d-flex justify-content-end align-items-center">
                        <div class="w-100 font-italic">
                            ${post.Tags.replace(/,/g, ', ')}
                        </div>
                        <h3 class="mb-0 mr-2">${post.Likes}</h3>
                        <i class="material-icons">favorite</i>
                    </div>

                    <div class="card mb-2">
                        <div class="card-body">

                            <h5>${post.Title}</h5>
                            <p>${post.Desc}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
        `;
                }
            };
            exports_1("PostsGOBView", PostsGOBView);
        }
    };
});
