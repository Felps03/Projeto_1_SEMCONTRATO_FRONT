System.register(["./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var userData_1, userData, user;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            user = document.getElementById('logged');
            if (localStorage.getItem('email')) {
                user.innerHTML = `
    <a class="menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
    aria-haspopup="true" aria - expanded="false">

    <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png"
        class="rounded-circle" width="60px">
    <strong><span id="nameSpan"></span></strong>
</a>
<div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <a class="dropdown-item d-flex align-items-center" href="user-edit.html" id="edit">
        <i class="material-icons">edit</i>Alterar Cadastro</a>

    <div class="dropdown-divider">
    </div>

    <a class="dropdown-item d-flex align-items-center" id="logout">
        <i class="material-icons">power_settings_new</i>
        <strong>Sair</strong>
    </a>
</div>
`;
            }
        }
    };
});
