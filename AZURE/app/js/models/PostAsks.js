import { PostAsk } from './index';
export class PostAsks {
    constructor() {
        this._postAsks = [];
    }
    add(postAsk) {
        this._postAsks.push(postAsk);
    }
    toArray() {
        return [].concat(this._postAsks);
    }
    static from(arr) {
        const newPostAsks = new PostAsks();
        arr.forEach((val) => {
            newPostAsks.add(new PostAsk(val.id_helpCenter, val.desc, val.id_user, val.owner, val._id));
        });
        return newPostAsks;
    }
}
