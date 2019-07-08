export class Posts {
    constructor() {
        this._posts = [];
    }
    adiciona(dailyNote) {
        this._posts.push(dailyNote);
    }
    paraArray() {
        return [].concat(this._posts);
    }
}
