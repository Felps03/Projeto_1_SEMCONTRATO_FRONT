System.register(["./View", "../utils/escapeTag"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, HomeDailyView;
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
            HomeDailyView = class HomeDailyView extends View_1.View {
                template(model) {
                    return `
            ${model.toArray().map(homeDailyNote => `
                <tr>
                    <td>${escapeTag_1.escapeTag(homeDailyNote.Author)}</td>
                    <td>${escapeTag_1.escapeTag(homeDailyNote.Yesterday)}</td>
                    <td>${escapeTag_1.escapeTag(homeDailyNote.Today)}</td>
                    <td>${escapeTag_1.escapeTag(homeDailyNote.Impediment)}</td>
                </tr>
            `).join('')}
        `;
                }
            };
            exports_1("HomeDailyView", HomeDailyView);
        }
    };
});
