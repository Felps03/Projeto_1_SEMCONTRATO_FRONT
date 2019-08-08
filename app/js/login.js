System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function login() {
        if (!localStorage.getItem('tkn'))
            document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><font color="#f1be1d"><h5><strong>Login</strong></h5></font></a>`;
    }
    exports_1("login", login);
    return {
        setters: [],
        execute: function () {
        }
    };
});
