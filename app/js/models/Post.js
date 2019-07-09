export class Post {
    constructor(title, desc, author, id) {
        this.title = title;
        this.desc = desc;
        this.author = author;
        this.id = id;
    }
    get Title() {
        return this.title;
    }
    get Desc() {
        return this.desc;
    }
    get Author() {
        return this.author;
    }
    get Id() {
        return this.id;
    }
}
