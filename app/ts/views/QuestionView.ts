import { View } from './View';
import { Post } from '../models/index';
import { publish } from '../utils/publish';

export class QuestionView extends View<Post> {
    private didMountFn: Function

    template(model: Post): string {
        console.log('pergunta: ', model);
        
        return `
        <div class="col-sm-11 col-12 d-flex align-items-stretch">
            <div class="d-flex flex-row flex-md-column align-items-center text-center justify-content-around pl-3 pr-3 w-100">
                <div>
                    <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle" width="70px">
                    <h6 class="mt-2">${model.AuthorName ? model.AuthorName : ""}</h6>
                </div>
            </div>

            <div class="col-sm-12 col-12">
                <div class="row">
                    <div class="col-sm-12">
                        <h5><strong>${model.Title}</strong></h5>
                        ${localStorage.getItem('id') === model.AuthorId ? `
                            <a href="app-help-asks.html?id=${model.Id}" class="float-right d-flex justify-content-center mr-n3">
                                <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 input-circle">
                                    <i class="small material-icons mr-2 align-middle">edit</i>Editar
                                </button>
                            </a>

                            <a href="app-help-asks.html?id=${model.Id}" class="float-right d-flex justify-content-center mr-n3">
                                <button type="button" class="btn btn-outline-danger btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle">
                                    <i class="small material-icons mr-2 align-middle">delete</i>Excluir
                                </button>
                            </a>
                        ` : ``}
                    
                        <div class="text-black-50 mt-n2 mb-2">
                            <image src="https://image.flaticon.com/icons/png/512/59/59252.png" class="mr-1" style="height: 15px">
                            ${publish(model.Date)}
                        </div>

                    </div>
                </div>
                <div class="mt-1">${model.Desc}</div> 
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