import { Posts } from "../models/Posts";
import { View } from "./View";
import { publish } from "../utils/publish";

export class PostsView extends View<Posts> {

    template(model: Posts): string {
        console.log(model.toArray());
        if (model.toArray().length == 0) {
            return `<div class='text-black-50 mt-4'>Nenhuma pergunta encontrada.</div>`;
        } else {
            return `
            ${model.toArray().map((post, i) => `
            <hr style="height: 1px;">
            <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-row flex-md-column text-center justify-content-around pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                        <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                        <h6 class="mt-2 responsive-user-name">${post.AuthorName ? post.AuthorName : ""}</h6>
                    </div>
                </div>

                <div class="col-9 col-sm-12 responsive-help-card">
                    <div class="row">
                        <div class="col-12 col-sm-12">
                            <div id="user-main responsive-help-drop">
                                <div class="dropdown mr-n4 txt-user" style="float:right;">
                                    <div class="d-flex align-items-center btn mr-n4 mt-n1" data-toggle="dropdown">
                                        
                                        <i class="small material-icons align-middle float-right responsive-help-drop">more_vert</i>  
                                    </div>
                                    <div class="dropdown-menu dropdown-menu-right align-user">
                                        <div class="dropdown-item">
                                            Usuário: <span id="userNameSpan"></span>
                                        </div>
                                        <div class="dropdown-divider"></div>
                
                                        <a class="dropdown-item d-flex align-items-center" href="user-edit.html">
                                            <i class="material-icons mr-2">edit</i>Alterar Cadastro</a>
                                        <a class="dropdown-item d-flex align-items-center" href="index.html">
                                            <i class="material-icons mr-2">home</i>Home</a>
                
                                        <div class="dropdown-divider"></div>
                
                                        <a class="dropdown-item d-flex align-items-center" id="logout">
                                            <i class="material-icons mr-2">power_settings_new</i><strong>Sair</strong></a>
                                    </div>
                                </div>
                            </div>
                            
                            <h5><strong>${post.Title}</strong></h5>
                       
                            <a href="app-help-asks.html?id=${post.Id}" class="float-right d-flex justify-content-center mr-n3">
                                <button type="button" class="btn btn-outline-info btn-sm  pr-3 pl-3 mt-n4 input-circle responsive-help-buttons" id="response-help">
                                    <i class="small material-icons mr-2 align-middle">question_answer</i>
                                    <text class="responsive-help-buttons">Responder</text>
                                </button>
                            </a>

                            ${localStorage.getItem('id') === post.AuthorId ? `
                                <a href="app-help-asks.html?id=${post.Id}" class="float-right d-flex justify-content-center mr-n3">
                                    <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons" id="edit-help">
                                        <i class="small material-icons mr-2 align-middle">edit</i>
                                        <text class="responsive-help-buttons">Editar</text>
                                    </button>
                                </a>

                                <a href="app-help-asks.html?id=${post.Id}" class="float-right d-flex justify-content-center mr-n3">
                                    <button type="button" class="btn btn-outline-danger btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons" id="remove-help">
                                        <i class="small material-icons mr-2 align-middle">delete</i>
                                        <text class="responsive-help-buttons">Excluir</text>
                                    </button>
                                </a>
                            ` : ``}
                            
                            
                            <div class="text-black-50 mt-n2 mb-2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish(post.Date)}
                            </div>
   
                        </div>
                    </div>
                    <div class="mt-1 text-justify">${post.Desc}</div> 
                </div> 
            </div>
 
            `).join('')}       
        `;
        }

    }
}
