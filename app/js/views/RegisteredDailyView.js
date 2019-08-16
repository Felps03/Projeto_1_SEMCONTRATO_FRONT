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
            <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                        <img src="https://image.flaticon.com/icons/png/512/64/64572.png" class="user-default-image">
                        <h6 class="mt-2 responsive-user-name">${registeredDaily.Owner ? registeredDaily.Owner : ""}</h6>
                    </div>
                </div>          

                <div class="col-9 responsive-help-card">
                    <div class="row">
                        <div class="col-12">

                        ${registeredDaily.Id_user == localStorage.getItem('id') || localStorage.getItem('isAdmin') == 'true' ? `
                            <div id="user-main responsive-help-drop">
                                ${window.innerWidth <= 576 ? `
                                    <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}">
                                        <i class="small material-icons mr-n4 align-middle float-right text-warning">edit</i>
                                    </a>
                                ` : ''}
                            </div>` : ''}

                        ${registeredDaily.Id_user == localStorage.getItem('id') || localStorage.getItem('isAdmin') == 'true' ? `
                        <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}" class="float-right d-flex justify-content-center mt-4 mr-n5 can-edit">
                            <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons" id="edit-daily">
                                <i class="small material-icons mr-2 align-middle">edit</i>
                                <text class="responsive-help-buttons">Editar</text>
                            </button>
                        </a>` : ''}

                            <div class="text-black-50 mb-2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish_1.publish(registeredDaily.Date)}
                            </div>
                            <strong>Ontem:</strong> ${escapeTag_1.escapeTag(registeredDaily.Yesterday)}</a><br><br>
                            <strong>Hoje:</strong> ${escapeTag_1.escapeTag(registeredDaily.Today)}<br><br>
                            <strong>Impedimentos:</strong> ${escapeTag_1.escapeTag(registeredDaily.Impediment)}<br><br>
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
