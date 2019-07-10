import { View } from './View';
export class PostsView extends View {
    template(model) {
        return `
        <div class="container">
            ${model.toArray().map((post, i) => `
            <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                    <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                        <div>
                            <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                            <h5 class="mt-2 mb-2">${post.AuthorName ? post.AuthorName : ""}</h5>
                        </div>
                        <button
                            class="btn btn-lg btn-outline-success d-flex justify-content-center align-items-center post-expand"
                            data-toggle="modal" data-target="#view-modal" data-i="${i}"><i
                                class="material-icons">remove_red_eye</i></button>
                    </div>
                </div>
                <div class="col-md-9 col-12 card-body">
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
