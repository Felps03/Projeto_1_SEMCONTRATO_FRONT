import { DailyNote } from './index';

export class DailyNotes {

    private _dailyNotes: DailyNote[] = [];

    add(dailyNote: DailyNote): void {

        this._dailyNotes.push(dailyNote);
    }

    paraArray(): DailyNote[] {

        return ([] as DailyNote[]).concat(this._dailyNotes);
    }

    static from(arr: any[]): DailyNotes {

        const newDailyNotes = new DailyNotes()

        for(let i = 0; i < arr.length-1; i++){
            newDailyNotes.add(new DailyNote(arr[i].yesterday, arr[i].today, arr[i].impediment, arr[i].date, arr[i].id))
        }
            
        console.log(newDailyNotes);
        return newDailyNotes;

    }
    // dataParaTexto(): <Date> document.getElementById('#filter').value
}