import { View } from './View';
export class UserMenu extends View {
    template() {
        return `
            <div class="dropdown mr-n4 txt-user" style="float:right;">
                <div class="d-flex align-items-center btn" data-toggle="dropdown">
                    <span id="nameSpan"></span>
                    <img src="app/img/user.png" class="rounded-circle" width="60px">
                    <i class="material-icons ml-n2">arrow_drop_down</i>
                </div>
                <div class="dropdown-menu dropdown-menu-right align-user">
                    <div class="dropdown-item">    
                        <span id="userNameSpan"></span>
                    </div>
                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" href="user-edit.html">
                        <i class="material-icons mr-2">edit</i>Alterar Cadastro</a>
                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" href="home.html">
                        <i class="material-icons mr-2">home</i>Home</a>

                    <a class="dropdown-item d-flex align-items-center" href="app-daily-note.html">
                        <i class="material-icons mr-2">event_note</i>Daily Note</a>
                    <a class="dropdown-item d-flex align-items-center" href="app-help-center.html">
                        <i class="material-icons mr-2">lightbulb_outline</i>Help Center</a>
                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" href="index.html" id="logout">
                        <i class="material-icons mr-2">power_settings_new</i><strong>Sair</strong></a>
                </div>
            </div>
        `;
    }
}
