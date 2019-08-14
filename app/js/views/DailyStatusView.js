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
                template(response, totalPages, type, typeAlert) {
                    return `
            <div class="alert ${typeAlert ? typeAlert : "alert-success"}  alert-dismissible fade show" role="alert">
                <strong>${response}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
                }
                clear() {
                    this._el.innerHTML = '';
                }
            };
            exports_1("DailyStatusView", DailyStatusView);
        }
    };
});
