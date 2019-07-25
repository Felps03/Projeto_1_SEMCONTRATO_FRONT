import { HomeDailyNote } from './index';

export class HomeDailyNotes {

    private _homeDailyNotes: HomeDailyNote[] = [];

    adiciona(dailyNote: HomeDailyNote): void {
        this._homeDailyNotes.push(dailyNote);
    }

    paraArray(): HomeDailyNote[] {
        return ([] as HomeDailyNote[]).concat(this._homeDailyNotes);
    }
}