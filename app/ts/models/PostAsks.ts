import { PostAsk } from './index';

export class PostAsks {

    private _postAsks: PostAsk[] = [];

    add(postAsk: PostAsk): void {

        this._postAsks.push(postAsk);
    }

    toArray(): PostAsk[] {

        return ([] as PostAsk[]).concat(this._postAsks);
    }

    static from(arr: any[]): PostAsks {

        const newPostAsks = new PostAsks()

        arr.forEach((val: any) => {
            newPostAsks.add(new PostAsk(val.id_helpCenter, val.desc, val.id_user, val.owner, val._id, val.date))
        })

        return newPostAsks

    }
}
