import { View } from './View';
import { HomeDailyNote } from '../models/index';
import { HomeDailyNotes } from '../models/HomeDailyNotes';
import { escapeTag } from '../utils/escapeTag';
import { publish } from '../utils/publish';
import { RegisteredDaylies } from '../models/RegisteredDaylies';

export class HomeDailyView extends View<RegisteredDaylies> {
    
    template(model: RegisteredDaylies): string {
        if (model.toArray().length == 0) {
            return `<div class='text-black-50 mt-4'>Nenhuma daily encontrada.</div>`;
        } else {
            return `
            ${model.toArray().map((daily, i) => `
            
            <hr style="height: 1px;">
                <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                    <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                        <div class="responsive-user-help">
                            <img src="https://image.flaticon.com/icons/png/512/64/64572.png" class="user-default-image">
                            <h6 class="mt-2 responsive-user-name">${daily.Owner ? daily.Owner : ""}</h6>
                        </div>
                    </div>          

                    <div class="col-9 responsive-help-card">
                        <div class="row">
                            <div class="col-12">
                    
                                <div class="text-black-50 mb-2">
                                    <i class="tiny material-icons align-middle">access_alarm</i>
                                    ${publish(daily.Date)}
                                </div>

                                <strong>Ontem:</strong> ${escapeTag(daily.Yesterday)}</a><br><br>
                                <strong>Hoje:</strong> ${escapeTag(daily.Today)}<br><br>
                                <strong>Impedimentos:</strong> ${escapeTag(daily.Impediment)}<br><br>
                            </div>
                        </div>
                    </div> 
                </div>
                 
    
            `).join('')}       
        `;
        }
    }
}
