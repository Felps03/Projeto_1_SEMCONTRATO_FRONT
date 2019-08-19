import { PostGOB, User } from './index';
import { UserService } from "../services/index";

export class PostsGOB {

    private _posts: PostGOB[] = [];

    add(post: PostGOB): void {

        this._posts.push(post);
    }

    toArray(): PostGOB[] {

        return ([] as PostGOB[]).concat(this._posts);
    }

    get(i: number): PostGOB {
        return this._posts[i]
    }

    static from(arr: any[]): PostsGOB {

        const newPostGOBs = new PostsGOB()

        arr.forEach((val: any) => {
            newPostGOBs.add(new PostGOB(
                val.titulo,
                val.corpo,
                val.username,
                val.data,
                val.imagem,
                val.numeroLikes,
                val.tags[0],
                val.resolvido,
                val._id
            ))
        })

        return newPostGOBs

    }
}
