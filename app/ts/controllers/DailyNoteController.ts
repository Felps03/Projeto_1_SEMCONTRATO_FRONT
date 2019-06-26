class DailyNoteController {
    
    private _yesterday : HTMLInputElement;
    private _today: HTMLInputElement;
    private _impediment: HTMLInputElement;
    private _date: HTMLInputElement;
    
    constructor() {
        this._yesterday = <HTMLInputElement>document.querySelector('#yesterday');
        this._today = <HTMLInputElement>document.querySelector('#today');
        this._impediment = <HTMLInputElement>document.querySelector('#impediment');
        this._date = <HTMLInputElement>document.querySelector('#date');
    }

    adiciona(event: Event) {
        event.preventDefault();

        const dailyNote = new DailyNote(
            this._yesterday,
            this._today,
            this._impediment,
            new Date(this._date.value)
        );
    }
}