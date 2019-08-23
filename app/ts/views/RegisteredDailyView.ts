import { View } from './View';
import { RegisteredDaily } from '../models/index';
import { RegisteredDaylies } from '../models/RegisteredDaylies';
import { escapeTag } from '../utils/escapeTag';
import { publish } from '../utils/publish';

export class RegisteredDailyView extends View<RegisteredDaylies> {

    template(model: RegisteredDaylies): string {
        if (model.toArray().length == 0) {
            return `<div class='text-black-50 mt-4'>Nenhuma daily encontrada.</div>`;
        } else {
            return `
            ${model.toArray().map(registeredDaily => `
            <hr style="height: 1px;">
            <div class="col-sm-12 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class=" pl-3 pr-3">
                    <div class="responsive-user-help">
                        <img src="../../img/user-icon.png" class="user-def-image ml-3">
                    </div>
                </div>          

                <div class="col-9 responsive-help-card">
                    <div class="row">
                        <div class="col-12 ml-n2">

                        
                        ${registeredDaily.Id_user == localStorage.getItem('id') || localStorage.getItem('isAdmin') == 'true' ? `
                        <div id="user-main responsive-help-drop">
                            <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}">
                                <i class="small material-icons mr-n4 align-middle float-right text-warning daily-btn-mob">edit</i>
                            </a>
                        </div>` : ''}
                        
                        ${registeredDaily.Id_user == localStorage.getItem('id') || localStorage.getItem('isAdmin') == 'true' ? `
                        <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}" class="float-right d-flex justify-content-center mt-4 can-edit responsive-daily-edit">
                            <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons daily-btn-joker" id="edit-daily">
                                <i class="small material-icons mr-2 align-middle">edit</i>
                                <text class="responsive-help-buttons">Editar</text>
                            </button>
                        </a>` : ''}

                            <div class="text-black-50 mb-2 d-flex align-items-center">
                                <i class="tiny material-icons align-middle ml-n1">access_alarm</i>
                                ${publish(registeredDaily.Date)}
                            </div>

                            <div class="text-black-50 mt-n2 mb-2">
                                <i class="tiny material-icons align-middle ml-n1">perm_identity</i>
                                <strong>${registeredDaily.Owner ? registeredDaily.Owner : ""}</strong>
                            </div>

                            <strong>Ontem:</strong> ${escapeTag(registeredDaily.Yesterday)}</a><br><br>
                            <strong>Hoje:</strong> ${escapeTag(registeredDaily.Today)}<br><br>
                            <strong>Impedimentos:</strong> ${registeredDaily.Impediment ? escapeTag(registeredDaily.Impediment) : ''}<br><br>
                        </div>
                    </div>
                </div> 
            </div>   
            `).join('')}
        `;
        }
    }
}
