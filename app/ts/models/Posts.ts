import { Post } from './index';

export class Posts {

    private _posts: Post[] = [];

    adiciona(dailyNote: Post): void {

        this._posts.push(dailyNote);
    }

    paraArray(): Post[] {

        return ([] as Post[]).concat(this._posts);
    }
}
