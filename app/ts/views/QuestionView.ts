import { View } from './View';
import { Post } from '../models/index';
import { escapeTag } from '../utils/escapeTag';
import { publish } from '../utils/publish';

export class QuestionView extends View<Post> {
    private didMountFn: Function

    template(model: Post): string {
        return `
            <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                        <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                        <h6 class="mt-2 responsive-user-name">${model.AuthorName ? escapeTag(model.AuthorName) : ""}</h6>
                    </div>
                </div>
                <div class="col-9 col-sm-12 responsive-help-card">
                    <div class="row">
                        <div class="col-12 col-sm-12 pr-0">

                            
                            
                            <h5><strong>${escapeTag(model.Title)}</strong></h5>

                            
                            
                            
                            <div class="text-black-50 mt-n2 mb-2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish(model.Date)}
                            </div>
   
                        </div>
                    </div>
                    <div class="mt-1 text-justify">${escapeTag(model.Desc)}</div> 
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


// ${localStorage.getItem('id') === model.AuthorId ? `
// <a class="dropdown-item d-flex align-items-center text-warning edit-help-respcan-edit" data-id="${model.Id}" href="./../help-center-edit.html?id=${model.Id}&owner=${model.AuthorId}">
//     <i class="material-icons mr-2">edit</i>Editar</a>

// <a class="dropdown-item d-flex align-items-center text-danger rmv-help-resp can-delete" data-id="${model.Id}" href="#">
//     <i class="material-icons mr-2">delete</i>Excluir</a>`
// : ''}


// ${localStorage.getItem('id') === model.AuthorId ? `
//                                 <a data-id="${model.Id}" href="./../help-center-edit.html?id=${model.Id}&owner=${model.AuthorId}" class="float-right d-flex justify-content-center mr-n3 can-edit">
//                                     <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons" id="edit-help">
//                                         <i class="small material-icons mr-2 align-middle">edit</i>
//                                         <text class="responsive-help-buttons">Editar</text>
//                                     </button>
//                                 </a>
//                                 <a data-id="${model.Id}" href="#" class="float-right d-flex justify-content-center mr-n3 can-delete">
//                                     <button type="button" class="btn btn-outline-danger btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons can-delete" id="remove-help">
//                                         <i class="small material-icons mr-2 align-middle">delete</i>
//                                         <text class="responsive-help-buttons">Excluir</text>
//                                     </button>
//                                 </a>
//                             ` : ``}