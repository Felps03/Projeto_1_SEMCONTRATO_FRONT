System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, Buttons;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            Buttons = class Buttons extends View_1.View {
                template(model) {
                    if (window.innerWidth > 576) {
                        return document.querySelector('#buttons').innerHTML = `<div class="row">
                            <div class="col-12 col-sm-6">
                                <button type="submit" name="send"
                                    class="btn btn-outline-danger btn-sm btn-block float-center pr-3 pl-3 mt-3 mb-3 input-circle"
                                    id="access">Cancelar</button>
                            </div>
                            <div class="col-12 col-sm-6">
                                <button type="submit" name="send"
                                    class="btn btn-outline-success btn-sm btn-block float-center pr-3 pl-3 mt-3 mb-3 input-circle"
                                    id="access">Cadastrar</button>
                            </div>
                        </div>`;
                    }
                    else {
                        return document.querySelector('#buttons').innerHTML = `<button type="submit" name="send" class="btn btn-outline-success btn-sm mt-3 pr-3 pl-3 float-right input-circle" id="edit-user">salvar</button>
                <button type="button" name="reset" class="btn btn-outline-danger btn-sm mt-3 pr-3 pl-3 mr-2 float-right input-circle" data-toggle="modal"
                    data-target="#cancelModal">Cancelar</button>`;
                    }
                }
            };
            exports_1("Buttons", Buttons);
        }
    };
});
