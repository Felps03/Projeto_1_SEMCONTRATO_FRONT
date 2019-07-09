import { Post, User } from './index';
import { UserService } from "../services/index";
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
        return new Promise((resolve, reject) => {
            const newPosts = new Posts();
            const userService = new UserService();
            let promises = [];
            arr.forEach((val) => {
                promises.push(userService.findById(val.id_user)
                    .then(res => res.json())
                    .then((res) => {
                    return new User(res.name, res.lastName, res.userName, res.email, "", res.dateOfBirth);
                })
                    .then((user) => {
                    newPosts.add(new Post(val.title, val.desc, user, val._id));
                }));
            });
            Promise.all(promises)
                .then(() => {
                resolve(newPosts);
            })
                .catch(reject);
        });
    }
}
