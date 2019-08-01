import { View } from './View';
import { Post, PostAsk, PostAsks } from '../models/index';

export class AnswersView extends View<PostAsks> {

    template(model: PostAsks, page: number = 1): string {
        //console.log(model);
        let result: string = `
            <div class="container">
        `;
                model.toArray().forEach(PostAsk => {
                    result +=`
                        <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                                <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                                    <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                                        <div>
                                            <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                                            <h5 class="mt-2 mb-2">${PostAsk.AuthorName ? PostAsk.AuthorName : ""}</h5>
                                        </div>
                                        
                                        <a href="app-help-asks.html?id=${PostAsk.Id}?page=${page}">
                                        </a>
            
                                    </div>
                                </div>
                                <div class="col-md-9 col-12 card-body">
                                    <div class="card mb-2">
                                        <div class="card-body">
                                            <p>${PostAsk.Desc}</p>
                                        </div>
                                    </div>`;
                                if(PostAsk.Id_user === localStorage.getItem('id')){
                                    result += `<form id="delete_ask" > 
                                                    <input type="hidden" name="id" value="${PostAsk.Id}">
                                                    <input type="submit" value="Excluir">
                                            </form>`;
                                }
                               result +=  `</div>
                            </div>
                        </div>`
                        ;
                });
                return result;

        // let result: string = `
        //     <div class="container">
        //         ${model.toArray().map((PostAsk, i) =>{ `
        //         <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
        //             <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
        //                 <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
        //                     <div>
        //                         <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
        //                         <h5 class="mt-2 mb-2">${PostAsk.AuthorName ? PostAsk.AuthorName : ""}</h5>
        //                     </div>
                            
        //                     <a href="app-help-asks.html?id=${PostAsk.Id}?page=${page}">
        //                     </a>

        //                 </div>
        //             </div>
        //             <div class="col-md-9 col-12 card-body">
        //                 <div class="card mb-2">
        //                     <div class="card-body">
        //                         <p>${PostAsk.Desc}</p>
        //                     </div>
        //                 </div>`;
        //             if(PostAsk.Id_user === localStorage.getItem('id')){
        //                 result += `<form id="delete_ask" > 
        //                                 <input type="hidden" name="id" value="${PostAsk.Id}">
        //                                 <input type="submit" value="Excluir">
        //                         </form>`;
        //             }
        //            result +=  `</div>
        //         </div>
        //     </div>`
        //     ;
        //     }).join('')}`
        // return result;
    }
}