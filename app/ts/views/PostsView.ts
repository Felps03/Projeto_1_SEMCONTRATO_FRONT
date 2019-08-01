import { View } from './View';
import { Posts, User } from '../models/index';

export class PostsView extends View<Posts> {

    template(model: Posts): string {
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
                    <h5><strong>${post.Title}</strong></h5>
                    <div>${post.Desc}</div>

                    <a href="app-help-asks.html?id=${post.Id}" class="position-absolute custom-bottom-align">
                        <button type="button" class="btn btn-outline-warning btn-sm pr-4 pl-4 input-circle">Responder</button>
                    </a>
                </div> 
            </div>   
 
            `).join('')}
        
        `;
    }
}
