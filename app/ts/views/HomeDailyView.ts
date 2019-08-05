import { View } from './View';
import { HomeDailyNote } from '../models/index';
import { HomeDailyNotes } from '../models/HomeDailyNotes';
import { escapeTag } from '../utils/escapeTag';

export class HomeDailyView extends View<HomeDailyNotes> {

    template(model: HomeDailyNotes): string {
        return `
            ${model.toArray().map(homeDailyNote => `
                <tr>
                    <td>${escapeTag(homeDailyNote.Author)}</td>
                    <td>${escapeTag(homeDailyNote.Yesterday)}</td>
                    <td>${escapeTag(homeDailyNote.Today)}</td>
                    <td>${escapeTag(homeDailyNote.Impediment)}</td>
                </tr>
            `).join('')}
        `;
    }
}
