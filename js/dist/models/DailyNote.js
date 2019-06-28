"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DailyNote = (function () {
    function DailyNote(yesterday, today, impediment, date) {
        this._yesterday = yesterday;
        this._today = today;
        this._impediment = impediment;
        this._date = date;
    }
    Object.defineProperty(DailyNote.prototype, "yesterday", {
        get: function () {
            return this._yesterday;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DailyNote.prototype, "today", {
        get: function () {
            return this._today;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DailyNote.prototype, "impediment", {
        get: function () {
            return this._impediment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DailyNote.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: true,
        configurable: true
    });
    return DailyNote;
}());
exports.DailyNote = DailyNote;
//# sourceMappingURL=DailyNote.js.map