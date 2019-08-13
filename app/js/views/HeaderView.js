System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, HeaderView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            HeaderView = class HeaderView extends View_1.View {
                template(model) {
                    return `
        <nav class="navbar  navbar-expand-lg navbar-light bg-light header-position shadow" id = "navbar">

            <a class="" href = "index.html">
                <img src="./img/logo_compasso.png">
                    </a>

                    <button class="navbar-toggler" type = "button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation" >
            <span class="navbar-toggler-icon"> </span>
                </button>



                <div class="collapse navbar-collapse" id = "navbarSupportedContent">

                    <ul class="navbar-nav w-100 mr-md-5">

                        <li class="nav-item ml-md-5 mr-md-1 mt-3 mt-md-0">
                            <a class="menu-item mt-md-3 ml-md-4" href = "app-daily-note.html">
                                <h5>
                                <strong>Daily Note </strong>
                                    </h5>
                                    </a>
                                    </li>

                                    <li class="nav-item ml-md-3 mr-md-3 mt-3 mt-md-0">
                                        <a class="menu-item mt-md-3 ml-md-4" href = "app-help-center.html">
                                            <h5>
                                            <strong>Help Center </strong>
                                                </h5>
                                                </a>
                                                </li>

                                                <li class="nav-item dropdown mr-md-3 mt-3 mb-3 mb-md-0 mt-md-0">
                                                    <a class="menu-item mt-md-3 ml-md-4" href = "#" id = "navbarDropdown" role = "button" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">

            <h5>
            <strong>
            Game of Bols
                </strong>
                </h5>

                </a>
                <div class="dropdown-menu" aria - labelledby="navbarDropdown">
                    <a class="menu-item mt-3 ml-4" href = "app-daily-gob.html">

                        <strong>Daily Note </strong>

                            </a>
                            <div class="dropdown-divider"> </div>
                                <a class="menu-item mt-3 ml-4 mb-3" href = "app-help-center-gob.html">

                                    <strong>Help Center </strong>

                                        </a>

                                        </div>
                                        </li>


                                        
                                        ${localStorage.getItem('tkn') ? `
                                        <li class="nav-item dropdown mt-md-2 ml-md-auto mr-md-5">
                                            <a class="menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">

            <strong><span id="nameSpan"></span></strong>
            
            <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png"
                class="rounded-circle" width="60px">
            
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            
            <a class="dropdown-item d-flex align-items-center" id="">
                Usuário:&nbsp<span id="userNameSpan"></span>
            </a>

            <div class="dropdown-divider">
            </div>

            <a class="dropdown-item d-flex align-items-center" href="index.html" id="edit">
                <i class="material-icons">home</i>Home</a>

            <a class="dropdown-item d-flex align-items-center" href="user-edit.html" id="edit">
                <i class="material-icons">edit</i>Alterar Cadastro</a>

            <div class="dropdown-divider">
            </div>

            <a class="dropdown-item d-flex align-items-center" id="logout">
                
            <i class="material-icons">power_settings_new</i>
            <strong>Sair</strong>    
            </a>
        </div>
                                        ` : `
                                        <li class="nav-item dropdown mt-md-2 ml-md-auto mr-md-5">
                                        
                                                <a class="menu-item" href = "home.html">
                                                <strong class="txt-primary"> Login </strong>

                                                    <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle"
        width ="60px">

            </a>

            </li>

            </div>


            <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type = "search" placeholder = "Search" aria - label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type = "submit" > Search < /button>
                        </form> -->


                        </nav>
                                        `}`;
                }
            };
            exports_1("HeaderView", HeaderView);
        }
    };
});
