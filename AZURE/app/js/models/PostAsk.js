export class PostAsk {
    constructor(id_helpCenter, desc, id_user, authorName, id) {
        this.id_helpCenter = id_helpCenter;
        this.desc = desc;
        this.id_user = id_user;
        this.authorName = authorName;
        this.id = id;
    }
    get helpCenter() {
        return this.id_helpCenter;
    }
    get Desc() {
        return this.desc;
    }
    get Author() {
        return this.id_user;
    }
    get Id() {
        return this.id;
    }
    get AuthorName() {
        return this.authorName;
    }
}
