export class DailyNotes {
    constructor() {
        this._dailyNotes = [];
    }
    adiciona(dailyNote) {
        this._dailyNotes.push(dailyNote);
    }
    paraArray() {
        return [].concat(this._dailyNotes);
    }
}
