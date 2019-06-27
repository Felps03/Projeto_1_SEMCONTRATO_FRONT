import { View } from './View';
import { DailyNote } from '../models/index';
import { DailyNotes } from '../models/DailyNotes';

export class DailyNoteView extends View<DailyNote> {

    template(model: DailyNotes): string {

        return `
        <form class="form" method="post" id="viewdaily-form" autocomplete="off">
            ${model.paraArray().map(dailyNote =>
            `<div class="row">
                <div class="col-12 col-sm-6">
                    <div class="form-group">
                        <label for="name">Nome:</label>
                        <input type="text" name="name"
                            class="form-control form-control-sm input-circle"
                            id="name" value="${dailyNote.name}" disabled>
                        <div id="namevalidator"></div>
                    </div>
                </div>

                <div class="col-12 col-sm-6">
                    <div class="form-group">
                        <label for="date">Data:</label>
                        <input type="date" name="filter"
                            class="form-control form-control-sm ext-placeholder input-circle"
                            id="filter" value="${dailyNote.date}" disabled>
                        <div id="datevalidator"></div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="first"><strong>1. </strong>O que fez ontem?</label>
                <textarea name="first" class="form-control form-control-sm input-circle" id="first"
                    disabled>${dailyNote.yesterday}</textarea>
                <div id="firstvalidator"></div>
            </div>

            <div class="form-group">
                <label for="second"><strong>2. </strong>O que vai fazer hoje?</label>
                <textarea name="second" class="form-control form-control-sm input-circle" id="second"
                    disabled>${dailyNote.today}</textarea>
                <div id="secondvalidator"></div>
            </div>

            <div class="form-group">
                <label for="third"><strong>3. </strong>Tem impedimentos? Se sim, qual(is)?</label>
                <textarea name="third" class="form-control form-control-sm input-circle" id="third"
                    disabled>${dailyNote.impediment}</textarea>
                <div id="thirdvalidator"></div>
            </div>`
            ).join()};

            <button type="button"
                class="btn btn-outline-danger btn-sm float-right mt-2 pr-3 pl-3 input-circle"
                data-dismiss="modal">Voltar</button>
        </form>
        `;
    }
}