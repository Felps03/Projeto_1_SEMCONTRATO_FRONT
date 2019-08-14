System.register(["./View", "../config/index", "../utils/publish", "../utils/dateGOB"], function (exports_1, context_1) {
    "use strict";
    var View_1, index_1, publish_1, dateGOB_1, PostsGOBView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (publish_1_1) {
                publish_1 = publish_1_1;
            },
            function (dateGOB_1_1) {
                dateGOB_1 = dateGOB_1_1;
            }
        ],
        execute: function () {
            PostsGOBView = class PostsGOBView extends View_1.View {
                template(model) {
                    return `
        <div class="container">
            ${model.toArray().map((post, i) => `
            <hr style="height: 1px;">
            <div class="col-sm-11 col-12 mt-n1 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                    <img class="rounded-circle" width="55" src="${post.Photo ? `${index_1.GOB_HOST}public/uploads/${post.Photo}` : `${index_1.GOB_HOST}public/img/user.png`}" alt="Card image cap">
                        <h6 class="mt-2 responsive-user-name">${post.AuthorName ? post.AuthorName : ""}</h6>
                    </div>
                </div>

                <div class="col-9 col-sm-12 responsive-help-card">
                    <div class="row">
                        <div class="col-12 col-sm-12">

                            <h5><strong>${post.Title}</strong></h5>

                            <i class="small material-icons mt-n4 mr-n3 align-middle float-right ${post.Solved ? 'text-success' : 'txt-primary'}">check</i>

                            <a href="http://gob-dev.azurewebsites.net/helpCenter/topico/${post.Id}" target="_blank">
                                <i class="material-icons float-right mt-2 mr-n3 txt-primary"> forum </i>
                            </a>

                            <a href="#" class="float-right mt-n4 mr-1">
                                <i class="material-icons text-danger"> favorite </i>${post.Likes}
                            <a>
         
                            <div class="text-black-50 mt-n2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish_1.publish(new Date(dateGOB_1.reverseDateGOB(post.Date)))}
                            </div>

                            <div class="w-100 mt-2 mb-2">${post.Tags ? '<strong>Tags: </strong>' : ''}
                                ${post.Tags ? post.Tags.replace(/,/g, ', ') : ''}
                            </div>

                            

                        </div>
                    </div>
                    <div class="mt-1 text-justify mb-2 mb-4">${post.Desc}</div> 
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
