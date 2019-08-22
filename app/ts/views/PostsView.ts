import { View } from './View';
// import { Posts, User } from '../models/index';
// import { escapeTag } from '../utils/escapeTag';
import { Posts, User, Post } from '../models/index';
import { publish } from "../utils/publish";
import { escapeTag } from '../utils/escapeTag';

export class PostsView extends View<Posts> {
    private didMountFn: Function
    template(model: Posts): string {
        if (model.toArray().reverse().length == 0) {
            return `<div class='text-black-50 mt-4'>Nenhuma pergunta encontrada.</div>`;
        } else {
            return `
            ${model.toArray().map((post, i) => {
                const canEdit = post.AuthorId === localStorage.getItem('id') || localStorage.getItem('isAdmin') === 'true'

                return `
                <div class="clicker">
                    <hr style="height: 1px;">
                    <a href="app-help-asks.html?id=${post.Id}" class="text-help">
                
                    <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                        <div class="d-flex flex-column text-center align-items-center w-100">
                            <div class="responsive-user-help">
                                <img src="../../img/user-icon.png" class="user-def-image">
                                
                            </div>
                        </div>

                        <div class="col-11 col-sm-12 responsive-help-card">
                            <div class="row">
                                <div class="col-12 col-sm-12 card-description-responsive">
                            
                                    <div class="word-cut"><h5><strong>${escapeTag(post.Title)}</strong></h5></div>
                                    
                                    <div class="text-black-50 mt-n2 mb-2">
                                        <i class="tiny material-icons align-middle">access_alarm</i>
                                        ${publish(post.Date)}
                                    </div>

                                    <div class="text-black-50 mt-n2 mb-2">
                                        <i class="tiny material-icons align-middle">perm_identity</i>
                                        <strong>${post.AuthorName ? escapeTag(post.AuthorName) : ""}</strong>
                                    </div>
                                </div>
                            </div>
                                
                        </div> 
                    </div>
            
                    </a>  
                </div>
            
            `}).join('')}       
        `;
        }

    }
    update(model: Posts, totalPages: number) {
        super.update(model, totalPages)

        if (this.didMountFn)
            this.didMountFn()
    }

    didMount(cb: Function) {
        this.didMountFn = cb
    }

}
