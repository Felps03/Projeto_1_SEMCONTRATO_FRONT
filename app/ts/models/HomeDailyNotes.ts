import { HomeDailyNote } from './index';

export class HomeDailyNotes {

    private _homeDailyNotes: HomeDailyNote[] = [];

    add(dailyNote: HomeDailyNote): void {
        this._homeDailyNotes.push(dailyNote);
    }

    toArray(): HomeDailyNote[] {
        return ([] as HomeDailyNote[]).concat(this._homeDailyNotes);
    }
}