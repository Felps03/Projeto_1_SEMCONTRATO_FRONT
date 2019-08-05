import { View } from './View';
import { Post, PostAsk, PostAsks } from '../models/index';
import { HOST } from '../config/index';

export class AnswersView extends View<PostAsks> {

    private lastModel: PostAsks | null
    private didMountFn: Function

    constructor(selector: string, escape: boolean = false) {
        super(selector, escape)

        this.lastModel = null
    }

    template(model: PostAsks, page: number = 1): string {

        this.lastModel = model

        // console.log('modelo: ',model);
        //console.log(model);
        let result: string = `
            <div class="container">
        `;
                model.toArray().forEach(PostAsk => {
                    result +=`${console.log('resposta:',PostAsk)}
                        <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                                <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                                    <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                                        <div>
                                            <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                                            <h5 class="mt-2 mb-2">${PostAsk.AuthorName ? PostAsk.AuthorName : ""}</h5>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                
                                <div class="col-md-9 col-12 card-body">
                                    <div class="card mb-2">
                                        <div class="card-body">
                                            <p>${PostAsk.Desc}</p>
                                        </div>
                                    </div>
                                
                                ${PostAsk.Id_user === localStorage.getItem('id') ? `<a class="can-delete" data-id="${PostAsk.Id}" href="#">Deletar</a>`: ""}
                                    
                                ${PostAsk.Id_user === localStorage.getItem('id') ? `<a class="can-edit" data-id="${PostAsk.Id}" href="./../help-ask-edit.html?id=${PostAsk.Id}&owner=${PostAsk.Id_user}">Editar</a>` : ""}
                                </div>
                            </div>
                        </div>`
                    ;
                });
                return result;
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