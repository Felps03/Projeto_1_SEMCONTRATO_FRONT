import { Post, User } from './index';
import { UserService } from "../services/index";

export class Posts {

    private _posts: Post[] = [];

    add(post: Post): void {

        this._posts.push(post);
    }

    toArray(): Post[] {

        return ([] as Post[]).concat(this._posts);
    }

    get(i: number): Post {
        return this._posts[i]
    }

    static from(arr: any[]): Posts {

        const newPosts = new Posts()

        arr.forEach((val: any) => {
            console.log(val)
            newPosts.add(new Post(val.title, val.desc, val.id_user, val.owner, val._id))
        })

        return newPosts

    }
}
