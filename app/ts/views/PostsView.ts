import { Posts } from "../models/Posts";
import { View } from "./View";
import { publish } from "../utils/publish";

export class PostsView extends View<Posts> {

    template(model: Posts): string {
        if(model.toArray().length == 0) {
            return `<div class='text-black-50 mt-4'>Não há perguntas registradas no momento.</div>`;
        } else {
            return `
            ${model.toArray().map((post, i) => `
            <hr>
            <div class="col-sm-11 col-12 d-flex align-items-stretch">
                <div class="d-flex flex-row flex-md-column align-items-center text-center justify-content-around pl-3 pr-3 w-100">
                    <div>
                        <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle" width="70px">
                        <h6 class="mt-2">${post.AuthorName ? post.AuthorName : ""}</h6>
                    </div>
                </div>

                <div class="col-sm-12 col-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <h5><strong>${post.Title}</strong></h5>
                            <a href="app-help-asks.html?id=${post.Id}" class="float-right d-flex justify-content-center mr-n3">
                                <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 input-circle">
                                    <i class="small material-icons mr-2 align-middle">question_answer</i>Responder
                                </button>
                            </a>
                            <div class="text-black-50 mt-n2 mb-2">${publish(post.Date)}</div>

                            
                        </div>
                    </div>
                    <div class="mt-1">${post.Desc}</div> 
                </div> 
            </div>   
 
            `).join('')}
        
        `;
        }
       
    }
}
