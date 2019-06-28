var DailyNoteController = (function () {
    function DailyNoteController() {
        this._yesterday = document.querySelector('#yesterday');
        this._today = document.querySelector('#today');
        this._impediment = document.querySelector('#impediment');
        this._date = document.querySelector('#date');
    }
    DailyNoteController.prototype.adiciona = function (event) {
        event.preventDefault();
        var dailyNote = new DailyNote(this._yesterday, this._today, this._impediment, new Date(this._date.value));
    };
    return DailyNoteController;
}());
//# sourceMappingURL=DailyNoteController.js.map