System.register(["./View", "../utils/escapeTag", "../utils/publish"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, publish_1, RegisteredDailyView;
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
            RegisteredDailyView = class RegisteredDailyView extends View_1.View {
                template(model) {
                    if (model.toArray().length == 0) {
                        return `<div class='text-black-50 mt-4'>Nenhuma daily encontrada.</div>`;
                    }
                    else {
                        return `
            ${model.toArray().map(registeredDaily => `
            <hr style="height: 1px;">
            <div class="col-sm-12 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class=" pl-3 pr-3">
                    <div class="responsive-user-help">
                        <img src="../../img/user-icon.png" class="user-def-image ml-3">
                    </div>
                </div>          

                <div class="col-9 responsive-help-card">
                    <div class="row">
                        <div class="col-12 ml-n2">

                        
                        ${registeredDaily.Id_user == localStorage.getItem('id') || localStorage.getItem('isAdmin') == 'true' ? `
                        <div id="user-main responsive-help-drop">
                            <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}">
                                <i class="small material-icons mr-n4 align-middle float-right text-warning daily-btn-mob">edit</i>
                            </a>
                        </div>` : ''}
                        
                        ${registeredDaily.Id_user == localStorage.getItem('id') || localStorage.getItem('isAdmin') == 'true' ? `
                        <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}" class="float-right d-flex justify-content-center mt-4 can-edit responsive-daily-edit">
                            <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons daily-btn-joker" id="edit-daily">
                                <i class="small material-icons mr-2 align-middle">edit</i>
                                <text class="responsive-help-buttons">Editar</text>
                            </button>
                        </a>` : ''}

                            <div class="text-black-50 mb-2 d-flex align-items-center">
                                <i class="tiny material-icons align-middle ml-n1">access_alarm</i>
                                ${publish_1.publish(registeredDaily.Date)}
                            </div>

                            <div class="text-black-50 mt-n2 mb-2">
                                <i class="tiny material-icons align-middle ml-n1">perm_identity</i>
                                <strong>${registeredDaily.Owner ? registeredDaily.Owner : ""}</strong>
                            </div>

                            <strong>Ontem:</strong> ${escapeTag_1.escapeTag(registeredDaily.Yesterday)}</a><br><br>
                            <strong>Hoje:</strong> ${escapeTag_1.escapeTag(registeredDaily.Today)}<br><br>
                            <strong>Impedimentos:</strong> ${registeredDaily.Impediment ? escapeTag_1.escapeTag(registeredDaily.Impediment) : ''}<br><br>
                        </div>
                    </div>
                </div> 
            </div>   
            `).join('')}
        `;
                    }
                }
            };
            exports_1("RegisteredDailyView", RegisteredDailyView);
        }
    };
});
