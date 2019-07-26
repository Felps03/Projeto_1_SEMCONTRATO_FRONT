System.register(["../models/index", "../services/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, HelpCenterPageController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            HelpCenterPageController = class HelpCenterPageController {
                constructor(currentPage = 1) {
                    this.currentPage = currentPage;
                }
                list(event) {
                    event.preventDefault();
                    const helpCenterService = new index_2.HelpCenterService();
                    helpCenterService
                        .list(this.currentPage, null)
                        .then((result) => {
                        return result.json();
                    })
                        .then((res) => {
                        const posts = index_1.Posts.from(res.slice(0, -1));
                        Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
                            const i = el.getAttribute('data-i');
                            if (i) {
                                el.addEventListener('click', () => {
                                });
                            }
                        });
                    })
                        .catch((error) => {
                        console.error(error);
                    });
                }
            };
            exports_1("HelpCenterPageController", HelpCenterPageController);
        }
    };
});
