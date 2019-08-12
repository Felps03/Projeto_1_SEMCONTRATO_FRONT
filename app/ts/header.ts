import { getUser } from "./utils/userData";

let userData = getUser();

let user = document.getElementById('logged');

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
`
}