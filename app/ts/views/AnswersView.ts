import { View } from './View';
import { Post, PostAsk, PostAsks } from '../models/index';
import { escapeTag } from '../utils/escapeTag';
import { HOST } from '../config/index';
import { publish } from '../utils/publish';

export class AnswersView extends View<PostAsks> {

    private lastModel: PostAsks | null
    private didMountFn: Function

    constructor(selector: string, escape: boolean = false) {
        super(selector, escape)

        this.lastModel = null
    }

    template(model: PostAsks, page: number = 1): string {
        this.lastModel = model

        if (model.toArray().length == 0) {
            return `<div class='text-black-50 mt-4'>Nenhuma solução encontrada.</div>`;
        } else {
            return `
            <div class="">
                ${model.toArray().map((PostAsk, i) => `
                    <hr class="mb-4" style="height: 1px;">
                    <div class="col-sm-11 col-12 mb-n3 d-flex align-items-stretch responsive-full-help">
                        <div class="d-flex flex-column text-center align-items-center mt-n2 pl-3 pr-3 w-100">
                            <div class="responsive-user-help">
                                <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                                <h6 class="mt-2 responsive-user-name">${PostAsk.AuthorName ? escapeTag(PostAsk.AuthorName) : ""}</h6>
                            </div>
                        </div>
                        <div class="col-9 col-sm-12 responsive-help-card">
                            <div class="row">
                                <div class="col-12 col-sm-12 pr-0">
                                
                                    <div>
                                        <div class="dropdown txt-user" style="float:right;">
                                            <div class="d-flex align-items-center btn mr-n4 " data-toggle="dropdown">
                                                
                                                <i class="small material-icons align-middle float-right responsive-help-drop answer_op">more_vert</i>  
                                            </div>

                                            <div class="dropdown-menu dropdown-menu-right align-user pt-0 pb-0 mr-n3">

                                                ${localStorage.getItem('id') === PostAsk.Author || localStorage.getItem('isAdmin') == 'true' ? `
                                                <div class="mobile-operation">
                                                    <a class="dropdown-item d-flex align-items-center text-warning edit-help-resp can-edit" data-id="${PostAsk.Id}" href="./../help-ask-edit.html?id=${PostAsk.Id}&owner=${PostAsk.Id_user}">
                                                        <i class="material-icons mr-2">edit</i>Editar</a>
                                        
                                                    <a class="dropdown-item d-flex align-items-center text-danger rmv-help-resp can-delete" data-id="${PostAsk.Id}" href="#">
                                                        <i class="material-icons mr-2">delete</i>Excluir</a>
                                                </div>`
                    : ''}

                                            </div>
                                        </div>
                                    </div>

                                    ${localStorage.getItem('id') === PostAsk.Author || localStorage.getItem('isAdmin') == 'true' ? `
                                    <div class="desktop-operation">
                                        <a data-id="${PostAsk.Id}" href="./../help-ask-edit.html?id=${PostAsk.Id}&owner=${PostAsk.Id_user}" class="float-right d-flex justify-content-center mr-n3 can-edit">
                                            <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n2 mr-4 mb-2 input-circle responsive-help-buttons" id="edit-help">
                                                <i class="small material-icons mr-2 align-middle">edit</i>
                                                <text class="responsive-help-buttons">Editar</text>
                                            </button>
                                        </a>
                                   
                                        <a data-id="${PostAsk.Id}" href="#" class="float-right d-flex justify-content-center mr-n3 can-delete">
                                            <button type="button" class="btn btn-outline-danger btn-sm pr-3 pl-3 mt-n2 mr-4 mb-2 input-circle responsive-help-buttons can-delete" id="remove-help">
                                                <i class="small material-icons mr-2 align-middle">delete</i>
                                                <text class="responsive-help-buttons">Excluir</text>
                                            </button>
                                        </a>
                                    </div>
                                    ` : ``}
                                    
                                    
                                    <div class="text-black-50 mt-n2 mb-2 pt-0">
                                        <i class="tiny material-icons align-middle">access_alarm</i>
                                        ${publish(PostAsk.Date)}
                                    </div>
        
                                </div>
                            </div>
                            <div class="mt-1 text-justify mr-2 mb-4">${PostAsk.Desc}</div> 
                        </div> 
                    </div>
                `).join('')}
            </div>
            `
        };
    }

    update(model: PostAsks) {
        super.update(model)

        if (this.didMountFn)
            this.didMountFn()
    }

    didMount(cb: Function) {
        this.didMountFn = cb
    }
}