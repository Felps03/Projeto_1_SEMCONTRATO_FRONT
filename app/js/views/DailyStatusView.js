System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, DailyStatusView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            DailyStatusView = class DailyStatusView extends View_1.View {
                template(response) {
                    return `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>${response}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
                }
            };
            exports_1("DailyStatusView", DailyStatusView);
        }
    };
});
