import { View } from './View';
import { DailyNote, User } from '../models/index';
import { DailyNotesGOB } from '../models/DailyNotesGOB';
import { GOB_HOST } from '../config/index';
import { publish } from '../utils/publish';
import { escapeTag } from '../utils/escapeTag';
import { reverseDateGOB } from '../utils/dateGOB';

export class DailyNotesGOBView extends View<DailyNotesGOB> {

    template(model: DailyNotesGOB): string {

        if (model.paraArray().length == 0) {
            return `<div class='text-black-50 mt-4'>Nenhuma daily encontrada.</div>`;
        } else {
            return `
            ${model.paraArray().map(dailyNote => {
                console.log('wwwtttff', dailyNote.Date, typeof dailyNote.Date)
                return `
            <hr style="height: 1px;">
            <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                    <img class="rounded-circle" height="55" src="${dailyNote.Photo ? `${GOB_HOST}public/uploads/${dailyNote.Photo}` : `${GOB_HOST}public/img/user.png`}"></td> 
                        <h6 class="mt-2 responsive-user-name">${dailyNote.User ? dailyNote.User : ""}</h6>
                    </div>
                </div>          

                <div class="col-9 responsive-help-card">
                    <div class="row">
                        <div class="col-12">

                        <div class="text-black-50 mb-2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish(dailyNote.Date)}
                            </div>
                            <strong>Ontem:</strong> ${escapeTag(dailyNote.Yesterday)}</a><br><br>
                            <strong>Hoje:</strong> ${escapeTag(dailyNote.Today)}<br><br>
                            <strong>Impedimentos:</strong> ${escapeTag(dailyNote.Impediment)}<br><br>
                        </div>
                    </div>
                </div> 
            </div>  
            `}
        ).join('')}
 
    `
    }
}}