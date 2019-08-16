import { View } from './View';
import { getUser } from "../utils/userData";

export class HeaderView extends View<string> {
    
    template(model: string): string {
        let link = window.location.href;

        return `
    <nav class="navbar  navbar-expand-lg navbar-light bg-light header-position shadow" id = "navbar">

        <div class="container">
            <a class="" href = "index.html">
                <img src="./img/logo_compasso.png">
            </a>

            <i id="drop-hidder" class="large material-icons slotter-menu mr-2" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">menu</i>

                <div class="collapse navbar-collapse" id = "navbarSupportedContent">
                    <ul class="navbar-nav w-100">
                        
                        <li class="nav-item ml-md-5 mr-md-1 mt-2">
                            <a class="menu-item mt-md-3 ml-md-4" href = "app-daily-note.html">
                                <h5><strong>Daily Note </strong></h5>
                            </a>
                        </li>

                        <li class="nav-item ml-md-3 mr-md-3 mt-2">
                            <a class="menu-item mt-md-3 ml-md-4" href = "app-help-center.html">
                                <h5><strong>Help Center </strong></h5>
                            </a>
                        </li>

                        <li class="nav-item dropdown mr-md-3  mt-2 mb-3 mb-md-0">
                            <a class="menu-item mt-md-3 ml-md-4" href = "#" id = "navbarDropdown" role = "button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <h5><strong>Game of Bols</strong></h5>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right mt-2" aria - labelledby="navbarDropdown">
                                <a class="menu-item mt-3 ml-4" href = "app-daily-gob.html">
                                    <strong>Daily Note </strong>
                                </a>

                                <div class="dropdown-divider"> </div>

                                <a class="menu-item mt-3 ml-4 mb-3" href = "app-help-center-gob.html">
                                    <strong>Help Center </strong>
                                </a>
                            </div>
                        </li>


                                        
                        ${ localStorage.getItem('tkn') ? `
                        <li class="nav-item dropdown mt-md-2 ml-md-auto line-joker">
                            <a class="txt-primary" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <div class="user-slot">
                                    <img src="https://image.flaticon.com/icons/png/512/64/64572.png" class="joker-image-nd ml-1 mr-2 mt-1" width="40px">
                                    
                                    <span class="txt-primary" style="font-size: 15px" id="nameSpan"></span>

                                    <img src="https://image.flaticon.com/icons/png/512/64/64572.png" class="joker-image-st mt-1 ml-2" width="45px">
                                </div>

                            </a>

                            <div class="dropdown-menu mt-2 pr-4" aria-labelledby="navbarDropdown">
            
                                <a class="dropdown-item d-flex align-items-center" id="">
                                    <strong class="txt-primary">Usuário:</strong>&nbsp<span id="userNameSpan"></span>
                                </a>

                                <div class="dropdown-divider"> </div>

                                <a class="dropdown-item d-flex align-items-center" href="index.html" id="edit">
                                <i class="material-icons txt-primary">home</i>&nbspHome</a>

                                <a class="dropdown-item d-flex align-items-center" href="user-edit.html" id="edit">
                                <i class="material-icons txt-primary">edit</i>&nbspAlterar Cadastro</a>

                                <div class="dropdown-divider"> </div>

                                <a class="dropdown-item d-flex align-items-center" id="logout">
                                    <i class="material-icons text-danger">power_settings_new</i>&nbspSair   
                                </a>
                            </div>
                        </li>
                        `: `
                            ${link == 'http://localhost:3000/home.html' ? '' : `
                                <li class="nav-item dropdown mt-4 ml-md-auto">     
                                    <a class="menu-item" href = "home.html">
                                        <h5><strong class="login-hovering mr-1"> Login </strong></h5>
                                    </a>
                                </li>
                            `}
                            
                </div>


        </div>
    </nav>`}`
    }
}