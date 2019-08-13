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
            <div class="col-sm-11 col-12 mt-n2 mb-n3 d-flex align-items-stretch responsive-full-help">
                <div class="d-flex flex-column text-center align-items-center pl-3 pr-3 w-100">
                    <div class="responsive-user-help">
                        <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle clock-image">
                        <h6 class="mt-2 responsive-user-name">${registeredDaily.Owner ? registeredDaily.Owner : ""}</h6>
                    </div>
                </div>          

                <div class="col-9 responsive-help-card">
                    <div class="row">
                        <div class="col-12">

                        ${registeredDaily.Id_user == localStorage.getItem('id') || localStorage.getItem('isAdmin') == 'true' ? `
                            <div id="user-main responsive-help-drop">
                                ${window.innerWidth <= 576 ? `
                                    <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}">
                                        <i class="small material-icons mr-n4 align-middle float-right text-warning">edit</i>
                                    </a>
                                ` : ''}
                            </div>` : ''}

                        ${registeredDaily.Id_user == localStorage.getItem('id') || localStorage.getItem('isAdmin') == 'true' ? `
                        <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}" class="float-right d-flex justify-content-center mt-4 mr-n5 can-edit">
                            <button type="button" class="btn btn-outline-warning btn-sm pr-3 pl-3 mt-n4 mr-4 input-circle responsive-help-buttons" id="edit-daily">
                                <i class="small material-icons mr-2 align-middle">edit</i>
                                <text class="responsive-help-buttons">Editar</text>
                            </button>
                        </a>` : ''}

                        <div class="text-black-50 mb-2">
                                <i class="tiny material-icons align-middle">access_alarm</i>
                                ${publish(registeredDaily.Date)}
                            </div>
                            <strong>Ontem:</strong> ${escapeTag(registeredDaily.Yesterday)}</a><br><br>
                            <strong>Hoje:</strong> ${escapeTag(registeredDaily.Today)}<br><br>
                            <strong>Impedimentos:</strong> ${escapeTag(registeredDaily.Impediment)}<br><br>
                        </div>
                    </div>
                </div> 
            </div>   
            `).join('')}
        `;
    }
}}
