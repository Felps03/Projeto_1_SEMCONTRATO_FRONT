import { View } from './View';
import { Post } from '../models/index';
import { publish } from '../utils/publish';

export class QuestionView extends View<Post> {
    private didMountFn: Function

    template(model: Post): string {
        return `
            <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                        <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                        <h6 class="mt-2 responsive-user-name">${model.AuthorName ? model.AuthorName : ""}</h6>
                    </div>
                </div>
                <div class="col-9 col-sm-12 responsive-help-card">
                    <div class="row">
                        <div class="col-12 col-sm-12 pr-0">

                            <div id="responsive-help-drop">
                                <div class="dropdown txt-user" style="float:right;">
                                    <div class="d-flex align-items-center btn mr-n4 " data-toggle="dropdown">
                                        
                                        <i class="small material-icons align-middle float-right responsive-help-drop">more_vert</i>  
                                    </div>

                                    <div class="dropdown-menu dropdown-menu-right align-user pt-0 pb-0 mr-n3">

                                        ${localStorage.getItem('id') === model.AuthorId ? `
                                            <a class="dropdown-item d-flex align-items-center text-warning edit-help-resp" href="app-help-asks.html?id=${model.Id}">
                                                <i class="material-icons mr-2">edit</i>Editar</a>

                                            <a class="dropdown-item d-flex align-items-center text-danger rmv-help-resp" href="app-help-asks.html?id=${model.Id}">
                                                <i class="material-icons mr-2">delete</i>Excluir</a>`
                : ''}
                                    </div>
                                </div>
                            </div>
                            
                            <h5><strong>${model.Title}</strong></h5>

                            ${localStorage.getItem('id') === model.AuthorId ? `
                                <a href="app-help-asks.html?id=${model.Id}" class="float-right d-flex justify-content-center mr-n3">
                                    <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons" id="edit-help">
                                        <i class="small material-icons mr-2 align-middle">edit</i>
                                        <text class="responsive-help-buttons">Editar</text>
                                    </button>
                                </a>
                                <a href="app-help-asks.html?id=${model.Id}" class="float-right d-flex justify-content-center mr-n3">
                                    <button type="button" class="btn btn-outline-danger btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons" id="remove-help">
                                        <i class="small material-icons mr-2 align-middle">delete</i>
                                        <text class="responsive-help-buttons">Excluir</text>
                                    </button>
                                </a>
                            ` : ``}
                            
                            
                            <div class="text-black-50 mt-n2 mb-2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish(model.Date)}
                            </div>
   
                        </div>
                    </div>
                    <div class="mt-1 text-justify">${model.Desc}</div> 
                </div> 
            </div>
        `
    }

    update(model: Post) {
        super.update(model)

        if (this.didMountFn)
            this.didMountFn()
    }

    didMount(cb: Function) {
        this.didMountFn = cb
    }
}