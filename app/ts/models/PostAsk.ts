import { User } from "./index";

export class PostAsk {
    constructor(
        private id_helpCenter: string,
        private desc: string,
        private id_user: string
        // private date: Date
    ) { }

    get helpCenter() {
        return this.id_helpCenter
    }

    get Desc() {
        return this.desc
    }

    get Author() {
        return this.id_user
    }

}
