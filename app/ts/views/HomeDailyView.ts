import { View } from './View';
import { HomeDailyNote } from '../models/index';
import { HomeDailyNotes } from '../models/HomeDailyNotes';
import { escapeTag } from '../utils/escapeTag';
import { publish } from '../utils/publish';

export class HomeDailyView extends View<HomeDailyNotes> {

    template(model: HomeDailyNotes): string {
        if (model.toArray().length == 0) {
            return `<div class='text-black-50 mt-4'>Nenhuma daily encontrada.</div>`;
        } else {
            return `
            ${model.toArray().map((daily, i) => `
            <hr class="height: 10px;">
            <div class="row" style="overflow-x:hidden">
                <div class="d-flex col-3 flex-column align-items-center text-center justify-content-start pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                        <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle" width="70px">
                        <h6 class="mt-2">${daily.Author ? escapeTag(daily.Author) : ""}</h6>
                    </div>
                </div>
    
                            

                <div class="col-9 responsive-help-card">
                    <div class="row">
                        <div class="col-12">
                        <div class="text-black-50">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish(new Date())}
                            </div>
                            <p><h6><strong>Ontem:</strong> ${escapeTag(daily.Yesterday)}</h6></p>
                            <p><h6><strong>Hoje:</strong> ${escapeTag(daily.Today)}</h6></p>
                            <p><h6><strong>Impedimentos:</strong> ${escapeTag(daily.Impediment)}</h6></p>
                        </div>
                    </div>
                </div> 
            </div>   
    
            `).join('')}       
        `;
        }
    }
}
