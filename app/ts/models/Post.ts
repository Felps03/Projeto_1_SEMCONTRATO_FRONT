import { User } from "./index";

export class Post {
    constructor(
        private title: string,
        private desc: string,
        private author?: User
        // private date: Date
    ) { }

    get Title() {
        return this.title
    }

    get Desc() {
        return this.desc
    }

    get Author() {
        return this.author
    }

    // get Date() {
    //     return this.date
    // }
}