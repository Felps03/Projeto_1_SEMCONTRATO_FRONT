System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, UserMenuView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            UserMenuView = class UserMenuView extends View_1.View {
                template() {
                    return localStorage.getItem('tkn') ? `
            <div class="dropdown mr-n4 txt-user" style="float:right;">
                <div class="d-flex align-items-center btn" data-toggle="dropdown">
                    <span id="nameSpan"></span>
                    <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle" width="60px">
                    <i class="material-icons ml-n2">arrow_drop_down</i>
                </div>
                <div class="dropdown-menu dropdown-menu-right align-user">
                    <div class="dropdown-item">    
                        Usuário: <span id="userNameSpan"></span>
                    </div>
                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" href="user-edit.html">
                        <i class="material-icons mr-2">edit</i>Alterar Cadastro</a>
                    <a class="dropdown-item d-flex align-items-center" href="home.html">
                        <i class="material-icons mr-2">home</i>Home</a>

                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" id="logout">
                        <i class="material-icons mr-2">power_settings_new</i><strong>Sair</strong></a>
                </div>
            </div>
        ` : `<a href="index.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
                }
            };
            exports_1("UserMenuView", UserMenuView);
        }
    };
});
