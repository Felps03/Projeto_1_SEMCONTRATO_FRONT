System.register(["./View", "../utils/publish", "../utils/escapeTag"], function (exports_1, context_1) {
    "use strict";
    var View_1, publish_1, escapeTag_1, PostsView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (publish_1_1) {
                publish_1 = publish_1_1;
            },
            function (escapeTag_1_1) {
                escapeTag_1 = escapeTag_1_1;
            }
        ],
        execute: function () {
            PostsView = class PostsView extends View_1.View {
                template(model) {
                    if (model.toArray().reverse().length == 0) {
                        return `<div class='text-black-50 mt-4'>Nenhuma pergunta encontrada.</div>`;
                    }
                    else {
                        return `
            ${model.toArray().map((post, i) => {
                            const canEdit = post.AuthorId === localStorage.getItem('id') || localStorage.getItem('isAdmin') === 'true';
                            return `
                <div class="clicker">
                    <hr style="height: 1px;">
                    <a href="app-help-asks.html?id=${post.Id}" class="text-help">
                
                    <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                        <div class="d-flex flex-column text-center align-items-center w-100">
                            <div class="responsive-user-help">
                                <img src="../../img/user-icon.png" class="user-def-image">
                                
                            </div>
                        </div>

                        <div class="col-11 col-sm-12 responsive-help-card">
                            <div class="row">
                                <div class="col-12 col-sm-12 card-description-responsive">
                            
                                    <div class="word-cut"><h5><strong>${escapeTag_1.escapeTag(post.Title)}</strong></h5></div>
                                    
                                    <div class="text-black-50 mt-n2 mb-2">
                                        <i class="tiny material-icons align-middle">access_alarm</i>
                                        ${publish_1.publish(post.Date)}
                                    </div>

                                    <div class="text-black-50 mt-n2 mb-2">
                                        <i class="tiny material-icons align-middle">perm_identity</i>
                                        <strong>${post.AuthorName ? escapeTag_1.escapeTag(post.AuthorName) : ""}</strong>
                                    </div>
                                </div>
                            </div>
                                
                        </div> 
                    </div>
            
                    </a>  
                </div>
            
            `;
                        }).join('')}       
        `;
                    }
                }
                update(model, totalPages) {
                    super.update(model, totalPages);
                    if (this.didMountFn)
                        this.didMountFn();
                }
                didMount(cb) {
                    this.didMountFn = cb;
                }
            };
            exports_1("PostsView", PostsView);
        }
    };
});
