import { View } from './View';
import { PostsGOB, User } from '../models/index';
import { GOB_HOST } from '../config/index';

export class PostsGOBView extends View<PostsGOB> {

    template(model: PostsGOB): string {
        return `
        <div class="container">
            ${model.toArray().map((post, i) => `
            <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3 ${post.Solved ? 'border border-success' : ''}">
                <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                    <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                        <div>
                            <img class="rounded-circle" width="70" src="${post.Photo ? `${GOB_HOST}public/uploads/${post.Photo}` : `${GOB_HOST}public/img/user.png`}" alt="Card image cap">
                            <h5 class="mt-2 mb-2">${post.AuthorName ? post.AuthorName : ""}</h5>
                            <p class="mt-2 mb-2">${post.Date}</p>
                        </div>
                        <a href="http://gob-dev.azurewebsites.net/helpCenter/topico/${post.Id}" target="_blank">
                            <button class="btn btn-default btn-sm btn-info">
                                <i class="material-icons"> forum </i>
                            </button>
                        </a>

                    </div>
                </div>
                <div class="col-md-9 col-12 card-body">

                    <div class="d-flex justify-content-end align-items-center">
                        <div class="w-100 font-italic">
                            ${post.Tags ? post.Tags.replace(/,/g, ', ') : ''}
                        </div>
                        <h3 class="mb-0 mr-2">${post.Likes}</h3>
                        <i class="material-icons">favorite</i>
                    </div>

                    <div class="card mb-2">
                        <div class="card-body">

                            <h5>${post.Title}</h5>
                            <p>${post.Desc}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
        `;
    }
}
