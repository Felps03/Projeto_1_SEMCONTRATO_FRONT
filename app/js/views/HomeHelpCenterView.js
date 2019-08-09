System.register(["./View", "../utils/escapeTag", "../utils/publish"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, publish_1, HomeHelpCenterView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (escapeTag_1_1) {
                escapeTag_1 = escapeTag_1_1;
            },
            function (publish_1_1) {
                publish_1 = publish_1_1;
            }
        ],
        execute: function () {
            HomeHelpCenterView = class HomeHelpCenterView extends View_1.View {
                template(model) {
                    console.log(model.toArray());
                    if (model.toArray().length == 0) {
                        return `<div class='text-black-50 mt-4'>Nenhuma pergunta encontrada.</div>`;
                    }
                    else {
                        return `
            ${model.toArray().map((post, i) => `
            <hr>
            <div class="row" style="overflow-x:hidden">
                <div class="d-flex col-3 flex-column align-items-center text-center justify-content-start pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                        <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle" width="70px">
                        <h6 class="mt-2">${post.Owner ? escapeTag_1.escapeTag(post.Owner) : ""}</h6>
                    </div>
                </div>
    
                <div class="col-9 responsive-help-card">
                    <div class="row">
                        <div class="col-8 col-md-10">
                            <h5 class="d-inline-block"><strong>${escapeTag_1.escapeTag(post.Title)}</strong></h5>
                            
                            <div class="text-black-50 mt-n2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish_1.publish(post.Date)}
                            </div>
    
                        </div>
                        <div class="col-4 col-md-2">
                            <a href="app-help-asks.html?id=${post.Id}" class="float-right d-flex justify-content-center btn btn-outline-info btn-sm pr-3 pl-3 mb-1 input-circle">
                                <i class="small material-icons mr-md-2 align-middle">question_answer</i>
                                <span class="d-none d-sm-inline-block">Responder</span>
                            </a>
                        </div>
                    </div>
                    <div class="mt-1">${escapeTag_1.escapeTag(post.Description)}</div> 
                </div> 
            </div>   
    
            `).join('')}       
        `;
                    }
                }
            };
            exports_1("HomeHelpCenterView", HomeHelpCenterView);
        }
    };
});
