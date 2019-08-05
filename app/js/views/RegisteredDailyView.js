System.register(["./View", "../utils/escapeTag"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, RegisteredDailyView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (escapeTag_1_1) {
                escapeTag_1 = escapeTag_1_1;
            }
        ],
        execute: function () {
            RegisteredDailyView = class RegisteredDailyView extends View_1.View {
                template(model) {
                    return `
            ${model.toArray().map(registeredDaily => `
                <tr>
                <td>${escapeTag_1.escapeTag(registeredDaily.Owner)}</td>
                <td>${registeredDaily.Date.getUTCDate() < 10 ? '0' + registeredDaily.Date.getUTCDate() : registeredDaily.Date.getUTCDate()}/${registeredDaily.Date.getUTCMonth() + 1 < 10 ? '0' + (registeredDaily.Date.getUTCMonth() + 1) : registeredDaily.Date.getUTCMonth() + 1}/${registeredDaily.Date.getUTCFullYear()} </td>
                <td>${escapeTag_1.escapeTag(registeredDaily.Yesterday)}</td>
                <td>${escapeTag_1.escapeTag(registeredDaily.Today)}</td>
                <td>${escapeTag_1.escapeTag(registeredDaily.Impediment)}</td>
                <td>${localStorage.getItem('isAdmin') === 'true' || registeredDaily.Id_user === localStorage.getItem('id') ? `
                    <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}" class="btn btn-outline-warning btn-sm input-circle pt-2 mr-2" id="edit-daily">
                        <i class="small material-icons" id="teste">edit</i>
                    </a>` : ``}</td>
                </tr>
            `).join('')}
        `;
                }
            };
            exports_1("RegisteredDailyView", RegisteredDailyView);
        }
    };
});
