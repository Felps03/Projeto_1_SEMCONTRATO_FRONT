System.register(["./View", "../utils/publish"], function (exports_1, context_1) {
    "use strict";
    var View_1, publish_1, AnswersView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (publish_1_1) {
                publish_1 = publish_1_1;
            }
        ],
        execute: function () {
            AnswersView = class AnswersView extends View_1.View {
                template(model, page = 1) {
                    if (model.toArray().length == 0) {
                        return `<div class='text-black-50 mt-4'>Nenhuma solução encontrada.</div>`;
                    }
                    else {
                        return `
            <div class="">
                ${model.toArray().map((PostAsk, i) => `
                    <hr class="mb-4" style="height: 1px;">
                    <div class="col-sm-11 col-12 mb-n3 d-flex align-items-stretch responsive-full-help">
                        <div class="d-flex flex-row flex-md-column mt-n2 text-center justify-content-around pl-3 pr-3 w-100">
                            <div class="responsive-user-help">
                                <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                                <h6 class="mt-2 responsive-user-name">${PostAsk.AuthorName ? PostAsk.AuthorName : ""}</h6>
                            </div>
                        </div>
<<<<<<< HEAD
=======

>>>>>>> cbf6986f60abc4b508041136a2405f221a84d5eb
                        <div class="col-9 col-sm-12 responsive-help-card">
                            <div class="row">
                                <div class="col-12 col-sm-12 pr-0">
                                    <div id="user-main responsive-help-drop mr-n2">
                                        <div class="dropdown mt-0 txt-user pt-0 mr-n2" style="float:right;">
                                            <div class="d-flex align-items-center btn pt-0 mr-n4 mt-n1" data-toggle="dropdown">
                                                
                                                <i class="small material-icons align-middle float-right responsive-help-drop mr-2 pr-0">more_vert</i>  
                                            </div>
                                            <div class="dropdown-menu dropdown-menu-right align-user">
                                                <div class="dropdown-item">
                                                    Usuário: <span id="userNameSpan"></span>
                                                </div>
                                                <div class="dropdown-divider"></div>
                        
                                                <a class="dropdown-item d-flex align-items-center" href="user-edit.html">
                                                    <i class="material-icons mr-2">edit</i>Alterar Cadastro</a>
                                                <a class="dropdown-item d-flex align-items-center" href="index.html">
                                                    <i class="material-icons mr-2">home</i>Home</a>
                        
                                                <div class="dropdown-divider"></div>
                        
                                                <a class="dropdown-item d-flex align-items-center" id="logout">
                                                    <i class="material-icons mr-2">power_settings_new</i><strong>Sair</strong></a>
                                            </div>
                                        </div>
                                    </div>
<<<<<<< HEAD
=======

>>>>>>> cbf6986f60abc4b508041136a2405f221a84d5eb
                                    ${localStorage.getItem('id') === PostAsk.Author ? `
                                        <a href="app-help-asks.html?id=${PostAsk.Id}" class="float-right d-flex justify-content-center mr-n3">
                                            <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n2 mr-4 mb-2 input-circle responsive-help-buttons" id="edit-help">
                                                <i class="small material-icons mr-2 align-middle">edit</i>
                                                <text class="responsive-help-buttons">Editar</text>
                                            </button>
                                        </a>
<<<<<<< HEAD
=======

>>>>>>> cbf6986f60abc4b508041136a2405f221a84d5eb
                                        <a href="app-help-asks.html?id=${PostAsk.Id}" class="float-right d-flex justify-content-center mr-n3">
                                            <button type="button" class="btn btn-outline-danger btn-sm pr-3 pl-3 mt-n2 mr-4 mb-2 input-circle responsive-help-buttons" id="remove-help">
                                                <i class="small material-icons mr-2 align-middle">delete</i>
                                                <text class="responsive-help-buttons">Excluir</text>
                                            </button>
                                        </a>
                                    ` : ``}
                                    
                                    
                                    <div class="text-black-50 mt-n2 mb-2 pt-0">
                                        <i class="tiny material-icons align-middle">access_alarm</i>
                                        ${publish_1.publish(PostAsk.Date)}
                                    </div>
        
                                </div>
                            </div>
                            <div class="mt-1 text-justify mr-2 mb-4">${PostAsk.Desc}</div> 
                        </div> 
                    </div>
                `).join('')}
            </div>
            `;
                    }
                    ;
                }
            };
            exports_1("AnswersView", AnswersView);
        }
    };
});
