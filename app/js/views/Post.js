import { View } from './View';
export class PostView extends View {
    template(model) {
        return `
            <!-- view modal -->
            <div id="view-modal" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Pergunta</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div class="d-flex align-items-center">
                                <h2>${model.Title}</h2>
                                <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                            </div>

                            <p>${model.Desc}</p>
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
        `;
    }
}
