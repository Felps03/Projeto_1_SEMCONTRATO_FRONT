import { View } from './View';
import { DailyNote, User } from '../models/index';
import { DailyNotesGOB } from '../models/DailyNotesGOB';
import { GOB_HOST } from '../config/index';

export class DailyNotesGOBView extends View<DailyNotesGOB> {

    template(model: DailyNotesGOB): string {

        return `
        
            ${model.paraArray().map(dailyNote => `
            
        <tr> 
            <td> <img class="rounded-circle" height="70" src="${dailyNote.Photo ? `${GOB_HOST}public/uploads/${dailyNote.Photo}` : `${GOB_HOST}public/img/user.png`}"></td> 
            <td> ${dailyNote.User} </td> 
            <td> ${dailyNote.Date} </td> 
            <td> ${dailyNote.Yesterday} </td> 
            <td> ${dailyNote.Today} </td> 
            <td> ${dailyNote.Impediment} </td> 
        </tr>
            `
        ).join('')}
 
    `
    }
}