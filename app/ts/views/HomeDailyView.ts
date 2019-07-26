import { View } from './View';
import { HomeDailyNote } from '../models/index';
import { HomeDailyNotes } from '../models/HomeDailyNotes';

export class HomeDailyView extends View<HomeDailyNotes> {

    template(model: HomeDailyNotes): string {
        return `
            ${model.toArray().map(homeDailyNote =>`
                <tr>
                    <td>${homeDailyNote.Author}</td>
                    <td>${homeDailyNote.Yesterday}</td>
                    <td>${homeDailyNote.Today}</td>
                    <td>${homeDailyNote.Impediment}</td>
                </tr>
            `).join('')}
        `;
    }
}
