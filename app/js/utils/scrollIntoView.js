System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    }
    exports_1("isElementInViewport", isElementInViewport);
    function scrollIntoViewIfNotInView(el) {
        if (!isElementInViewport(el)) {
            el.scrollIntoView();
        }
    }
    exports_1("scrollIntoViewIfNotInView", scrollIntoViewIfNotInView);
    return {
        setters: [],
        execute: function () {
        }
    };
});
