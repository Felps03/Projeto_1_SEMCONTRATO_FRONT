import { View } from './View';
export class PostsView extends View {
    template(model) {
        return `
        <div class="container">
            ${model.paraArray().map((post, i) => `
            <div class="card d-flex flex-row justify-content-center align-items-stretch row">
                <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                    <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3">
                        <div>
                            <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                            <h5 class="mt-2 mb-2">${post.Author.Name} ${post.Author.LastName}</h5>
                        </div>
                        <button
                            class="btn btn-lg btn-outline-success d-flex justify-content-center align-items-center"
                            data-toggle="modal" data-target="#view-modal-${i}"><i
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

                    <form action="" id="quick-comment-form">
                        <div class="row">
                            <div class="form-group col-lg-10 col-9 mb-0">
                                <label for="first">Comentar:</label>
                                <textarea name="first" class="form-control form-control-sm input-circle"
                                    id="yesterday" placeholder="Sugira soluções ou contribua à discussão"
                                    autofocus></textarea>
                                <div id="firstvalidator"></div>
                            </div>
                            <div class="col-2 d-flex justify-content-center align-items-end mb-1">
                                <button type="submit" class="btn btn-primary d-flex align-items-center">
                                    <i class="material-icons ml-2">send</i>
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

            <script>
                document.getElementsByTagName('body')[0].innerHTML = \`
                    <!-- view modal -->
                    <div id="view-modal-${i}" class="modal fade" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Pergunta <small class="ml-1">${post.Date.toLocaleDateString()}</small> </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div class="d-flex align-items-center">
                                        <h2>${post.Title}</h2>
                                        <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                                    </div>

                                    <p>${post.Desc}</p>
                                </div>
                                <div class="container border-top p-3">

                                    <form action="" id="quick-comment-form">
                                        <div class="form-group">
                                            <label for="first">Comentar:</label>
                                            <textarea name="first" class="form-control form-control-sm input-circle"
                                                id="yesterday" placeholder="Sugira soluções ou contribua à discussão"
                                                autofocus></textarea>
                                            <div id="firstvalidator"></div>
                                        </div>
                                        <div class="d-flex d-row justify-content-end align-items-center">
                                            <button type="button" class="btn btn-secondary m-1"
                                                data-dismiss="modal">Cancelar</button>
                                            <button type="submit"
                                                class="btn btn-primary d-flex align-items-center">Enviar <i
                                                    class="material-icons ml-2">send</i></button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                \` + document.getElementsByTagName('body')[0].innerHTML
            </script>`)}
        </div>
        `;
    }
}
