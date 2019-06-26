class DailyNote {

    private _yesterday;
    private _today;
    private _impediment;
    private _date;

    constructor(yesterday, today, impediment, date) {
        this._yesterday = yesterday;
        this._today = today;
        this._impediment = impediment;
        this._date = date;
    }

    get yesterday() {
        return this._yesterday;
    }

    get today() {
        return this._today;
    }

    get impediment() {
        return this._impediment;
    }

    get date() {
        return this._date;
    }
}