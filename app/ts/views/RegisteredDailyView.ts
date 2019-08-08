import { View } from './View';
import { RegisteredDaily } from '../models/index';
import { RegisteredDaylies } from '../models/RegisteredDaylies';
import { escapeTag } from '../utils/escapeTag';

export class RegisteredDailyView extends View<RegisteredDaylies> {

    template(model: RegisteredDaylies): string {
        return `
            ${model.toArray().map(registeredDaily => `
                <tr>
                <td>${escapeTag(registeredDaily.Owner)}</td>
                <td>${registeredDaily.Date.getUTCDate() < 10 ? '0' + registeredDaily.Date.getUTCDate() : registeredDaily.Date.getUTCDate()}/${registeredDaily.Date.getUTCMonth() + 1 < 10 ? '0' + (registeredDaily.Date.getUTCMonth() + 1) : registeredDaily.Date.getUTCMonth() + 1}/${registeredDaily.Date.getUTCFullYear()} </td>
                <td>${escapeTag(registeredDaily.Yesterday)}</td>
                <td>${escapeTag(registeredDaily.Today)}</td>
                <td>${escapeTag(registeredDaily.Impediment)}</td>
                <td>${localStorage.getItem('isAdmin') === 'true' || registeredDaily.Id_user === localStorage.getItem('id') ? `
                    <a href="daily-edit.html?id=${registeredDaily.Id_daily}&owner=${registeredDaily.Id_user}" class="btn btn-outline-warning btn-sm input-circle pt-2 mr-2" id="edit-daily">
                        <i class="small material-icons" id="teste">edit</i>
                    </a>` : ``
            }</td>
                </tr>
            `).join('')}
        `;
    }
}
