export class HomeHelpCenter {

    private owner: string;
    private date: Date;
    private title: string;
    private description: string;

    constructor(owner: string, date: Date, title: string, description: string) {

        this.owner = owner;
        this.date = new Date(date);
        this.title = title;
        this.description = description;
    }

    get Owner() {
        return this.owner;
    }
    get Date() {
        return this.date;
    }
    get Title() {
        return this.title;
    }
    get Description() {
        return this.description;
    }
}