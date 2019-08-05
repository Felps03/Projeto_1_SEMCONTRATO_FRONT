import { View } from './View';
import { Posts, User } from '../models/index';
import { escapeTag } from '../utils/escapeTag';

export class PostsView extends View<Posts> {

    template(model: Posts): string {
        return `
        <div class="container">
            ${model.toArray().reverse().map((post, i) => `
            <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                    <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                        <div>
                            <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                            <h5 class="mt-2 mb-2">${post.AuthorName ? escapeTag(post.AuthorName) : ""}</h5>
                            <p class="mt-2 mb-2">${post.Date}</p>
                        </div>
                        <a href="app-help-asks.html?id=${post.Id}">
                            <button class="btn btn-default btn-sm btn-info">
                                <i class="material-icons"> forum </i>
                            </button>
                        </a>

                    </div>
                </div>
                <div class="col-md-9 col-12 card-body">
                    <div class="card mb-2">
                        <div class="card-body">

                            <h5>${escapeTag(post.Title)}</h5>
                            <p>${escapeTag(post.Desc)}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
        `;
    }
}
