System.register(["./View", "../config/index", "../utils/publish", "../utils/escapeTag"], function (exports_1, context_1) {
    "use strict";
    var View_1, index_1, publish_1, escapeTag_1, DailyNotesGOBView;
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
            function (escapeTag_1_1) {
                escapeTag_1 = escapeTag_1_1;
            }
        ],
        execute: function () {
            DailyNotesGOBView = class DailyNotesGOBView extends View_1.View {
                template(model) {
                    if (model.paraArray().length == 0) {
                        return `<div class='text-black-50 mt-4'>Nenhuma daily encontrada.</div>`;
                    }
                    else {
                        return `
            ${model.paraArray().map(dailyNote => {
                            console.log('wwwtttff', dailyNote.Date, typeof dailyNote.Date);
                            return `
            <hr style="height: 1px;">
            <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                    <img class="rounded-circle" height="55" src="${dailyNote.Photo ? `${index_1.GOB_HOST}public/uploads/${dailyNote.Photo}` : `${index_1.GOB_HOST}public/img/user.png`}"></td> 
                        <h6 class="mt-2 responsive-user-name">${dailyNote.User ? dailyNote.User : ""}</h6>
                    </div>
                </div>          

                <div class="col-9 responsive-help-card">
                    <div class="row">
                        <div class="col-12">

                        <div class="text-black-50 mb-2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish_1.publish(dailyNote.Date)}
                            </div>
                            <strong>Ontem:</strong> ${escapeTag_1.escapeTag(dailyNote.Yesterday)}</a><br><br>
                            <strong>Hoje:</strong> ${escapeTag_1.escapeTag(dailyNote.Today)}<br><br>
                            <strong>Impedimentos:</strong> ${escapeTag_1.escapeTag(dailyNote.Impediment)}<br><br>
                        </div>
                    </div>
                </div> 
            </div>  
            `;
                        }).join('')}
 
    `;
                    }
                }
            };
            exports_1("DailyNotesGOBView", DailyNotesGOBView);
        }
    };
});
