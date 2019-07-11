import { DailyNote } from './index';

export class DailyNotes {

    private _dailyNotes: DailyNote[] = [];

    adiciona(dailyNote: DailyNote): void {

        this._dailyNotes.push(dailyNote);
    }

    paraArray(): DailyNote[] {

        return ([] as DailyNote[]).concat(this._dailyNotes);
    }

    // dataParaTexto(): <Date> document.getElementById('#filter').value
}
