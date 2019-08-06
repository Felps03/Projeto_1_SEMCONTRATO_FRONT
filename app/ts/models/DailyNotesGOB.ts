import { DailyNoteGOB } from './index';

export class DailyNotesGOB {

    private _dailyNotesGOB: DailyNoteGOB[] = [];

    add(dailyNote: DailyNoteGOB): void {

        this._dailyNotesGOB.push(dailyNote);
    }

    paraArray(): DailyNoteGOB[] {

        return ([] as DailyNoteGOB[]).concat(this._dailyNotesGOB);
    }

    static from(arr: any[]): DailyNotesGOB {

        const newDailyNotes = new DailyNotesGOB()

        for (let i = 0; i < arr.length - 1; i++) {
            newDailyNotes.add(new DailyNoteGOB(arr[i].yesterday, arr[i].today, arr[i].impediment, arr[i].date, arr[i].photo, arr[i].user))
        }

        console.log(newDailyNotes);
        return newDailyNotes;

    }
    // dataParaTexto(): <Date> document.getElementById('#filter').value
}