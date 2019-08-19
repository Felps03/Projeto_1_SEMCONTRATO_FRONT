System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, DailyNoteGOBView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            DailyNoteGOBView = class DailyNoteGOBView extends View_1.View {
                template(model) {
                    return `
        
        `;
                }
            };
            exports_1("DailyNoteGOBView", DailyNoteGOBView);
        }
    };
});
