System.register([], function (exports_1, context_1) {
    "use strict";
    var url, url_ask_id;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            url = new URLSearchParams(location.search);
            url_ask_id = url.get('id');
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="index.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
        }
    };
});
