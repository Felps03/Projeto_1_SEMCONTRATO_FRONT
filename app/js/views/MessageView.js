System.register(["./View", "../utils/scrollIntoView"], function (exports_1, context_1) {
    "use strict";
    var View_1, scrollIntoView_1, MessageView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (scrollIntoView_1_1) {
                scrollIntoView_1 = scrollIntoView_1_1;
            }
        ],
        execute: function () {
            MessageView = class MessageView extends View_1.View {
                template(model, type = 'success') {
                    return `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${model}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`;
                }
                update(model, type = 'success') {
                    super.update(model, type);
                    scrollIntoView_1.scrollIntoViewIfNotInView(this._el);
                }
            };
            exports_1("MessageView", MessageView);
        }
    };
});
