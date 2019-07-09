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

    static from(arr: any[]): Promise<Posts> {
        return new Promise((resolve, reject) => {

            const newPosts = new Posts()
            const userService = new UserService()

            let promises: Promise<void>[] = []

            arr.forEach((val: any) => {
                promises.push(
                    userService.findById(val.id_user)
                        .then(res => res.json())
                        .then((res: any) => {
                            return new User(
                                res.name, res.lastName, res.userName,
                                res.email, "", res.dateOfBirth
                            )
                        })
                        .then((user: User) => {
                            newPosts.add(new Post(val.title, val.desc, user, val._id))
                        })
                )
            })

            Promise.all(promises)
                .then(() => {
                    resolve(newPosts)
                })
                .catch(reject)
        })
    }
}
