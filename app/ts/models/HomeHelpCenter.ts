export class HomeHelpCenter {

    private id: string;
    private owner: string;
    private date: Date;
    private title: string;
    private description: string;

    constructor(id: string, owner: string, date: Date, title: string, description: string) {
        this.id = id;
        this.owner = owner;
        this.date = new Date(date);
        this.title = title;
        this.description = description;
    }

    get Id() {
        return this.id;
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