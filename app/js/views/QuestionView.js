System.register(["./View", "../utils/escapeTag", "../utils/publish"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, publish_1, QuestionView;
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
            QuestionView = class QuestionView extends View_1.View {
                template(model) {
                    const canEdit = model.AuthorId === localStorage.getItem('id') || localStorage.getItem('isAdmin') === 'true';
                    return `
            <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                        <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                        <h6 class="mt-2 responsive-user-name">${model.AuthorName ? escapeTag_1.escapeTag(model.AuthorName) : ""}</h6>
                    </div>
                </div>
                
                <div class="col-9 col-sm-12 responsive-help-card">
                    <div class="row">
                        <div class="word-cut">
                            <div class="col-12 col-sm-12 pr-0">
                                
                                <div id="user-main responsive-help-drop">
                                <div class="dropdown mr-n4 txt-user" style="float:right;">
                                    <div class="d-flex align-items-center btn mr-n4 mt-n1" data-toggle="dropdown">

                                        <i class="small material-icons align-middle float-right responsive-help-drop">more_vert</i>
                                    </div>
                                    <div class="dropdown-menu dropdown-menu-right align-user pt-0 pb-0">

                                        ${canEdit ? `
                                            <a class="dropdown-item d-flex align-items-center text-warning edit-help-resp can-edit" data-id="${model.Id}" href="./../help-center-edit.html?id=${model.Id}&owner=${model.AuthorId}">
                                                <i class="material-icons mr-2">edit</i>Editar</a>`
                        : ''}

                                        ${canEdit ? `
                                            <a class="dropdown-item d-flex align-items-center text-danger rmv-help-resp can-del" data-id="${model.Id}" href="#">
                                                <i class="material-icons mr-2">delete</i>Excluir</a>`
                        : ''}
 
                                    </div>
                                </div>
                            </div>
  
                            <div class="word-cut"><h5><strong>${escapeTag_1.escapeTag(model.Title)}</strong></h5></div>
                         
                            

                            ${canEdit ? `
                                <a data-id="${model.Id}" href="./../help-center-edit.html?id=${model.Id}&owner=${model.AuthorId}" class="float-right d-flex justify-content-center can-edit">
                                    <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mr-4 input-circle responsive-help-buttons" id="edit-help">
                                        <i class="small material-icons mr-2 align-middle">edit</i>
                                        <text class="responsive-help-buttons">Editar</text>
                                    </button>
                                </a>
                                ` : ``}

                            ${canEdit ? `
                                <a data-id="${model.Id}" href="#" class="float-right d-flex justify-content-center can-del">
                                    <button type="button" class="btn btn-outline-danger btn-sm pr-3 pl-3 mr-4 input-circle responsive-help-buttons" id="remove-help">
                                        <i class="small material-icons mr-2 align-middle">delete</i>
                                        <text class="responsive-help-buttons">Excluir</text>
                                    </button>
                                </a>
                            ` : ``}

                                <div class="text-black-50 mt-n2 mb-2">
                                    <i class="tiny material-icons align-middle">access_alarm</i>
                                    ${publish_1.publish(model.Date)}
                                </div>
    
                            </div>
                        </div>    
                    </div>
                    <div class="mt-1 text-justify">${escapeTag_1.escapeTag(model.Desc)}</div> 
                </div> 
            </div>
            
        `;
                }
                update(model) {
                    super.update(model);
                    if (this.didMountFn)
                        this.didMountFn();
                }
                didMount(cb) {
                    this.didMountFn = cb;
                }
            };
            exports_1("QuestionView", QuestionView);
        }
    };
});
