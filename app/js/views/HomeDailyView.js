System.register(["./View", "../utils/escapeTag", "../utils/publish"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, publish_1, HomeDailyView;
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
            HomeDailyView = class HomeDailyView extends View_1.View {
                template(model) {
                    if (model.toArray().length == 0) {
                        return `<div class='text-black-50 mt-4'>Nenhuma daily encontrada.</div>`;
                    }
                    else {
                        return `
            ${model.toArray().map((daily, i) => `
            
            <hr style="height: 1px;">
                <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                    <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                        <div class="responsive-user-help">
                            <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                            <h6 class="mt-2 responsive-user-name">${daily.Owner ? daily.Owner : ""}</h6>
                        </div>
                    </div>          

                    <div class="col-9 responsive-help-card">
                        <div class="row">
                            <div class="col-12">
                    
                                <div class="text-black-50 mb-2">
                                    <i class="tiny material-icons align-middle">access_alarm</i>
                                    ${publish_1.publish(daily.Date)}
                                </div>

                                <strong>Ontem:</strong> ${escapeTag_1.escapeTag(daily.Yesterday)}</a><br><br>
                                <strong>Hoje:</strong> ${escapeTag_1.escapeTag(daily.Today)}<br><br>
                                <strong>Impedimentos:</strong> ${escapeTag_1.escapeTag(daily.Impediment)}<br><br>
                            </div>
                        </div>
                    </div> 
                </div>
                 
    
            `).join('')}       
        `;
                    }
                }
            };
            exports_1("HomeDailyView", HomeDailyView);
        }
    };
});
