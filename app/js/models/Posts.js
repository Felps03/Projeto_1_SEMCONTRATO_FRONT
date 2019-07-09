import { Post } from './index';
export class Posts {
    constructor() {
        this._posts = [];
    }
    add(post) {
        this._posts.push(post);
    }
    toArray() {
        return [].concat(this._posts);
    }
    get(i) {
        return this._posts[i];
    }
    static from(arr) {
        const newPosts = new Posts();
        arr.slice(0, -1).forEach((val) => {
            console.log(val);
            newPosts.add(new Post(val.title, val.desc, val.id_user, val.owner, val._id));
        });
        return newPosts;
    }
}
