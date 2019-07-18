export class DailyNote {
    constructor(yesterday, today, impediment, date) {
        this.yesterday = yesterday;
        this.today = today;
        this.impediment = impediment;
        this.date = date;
    }
    get Yesterday() {
        return this.yesterday;
    }
    get Today() {
        return this.today;
    }
    get Impediment() {
        return this.impediment;
    }
    get Date() {
        return this.date;
    }
}
