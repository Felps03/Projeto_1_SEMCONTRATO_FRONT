System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, HomeDailyView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            HomeDailyView = class HomeDailyView extends View_1.View {
                template(model) {
                    return `
            ${model.toArray().map(homeDailyNote => `
                <tr>
                    <td>${homeDailyNote.Author}</td>
                    <td>${homeDailyNote.Yesterday}</td>
                    <td>${homeDailyNote.Today}</td>
                    <td>${homeDailyNote.Impediment}</td>
                </tr>
            `).join('')}
        `;
                }
            };
            exports_1("HomeDailyView", HomeDailyView);
        }
    };
});
