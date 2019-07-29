System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, headerPaginationView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            headerPaginationView = class headerPaginationView extends View_1.View {
                template() {
                    return `
            <nav aria-label="daily-nav" class="float-right">
            <ul class="pagination">
                <li class="page-item">
            </a>
            </li>
        `;
                }
            };
            exports_1("headerPaginationView", headerPaginationView);
        }
    };
});
