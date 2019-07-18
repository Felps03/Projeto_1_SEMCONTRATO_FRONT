import { View } from './View';
import { PostAsks, PostAsk } from '../models/index';
import { PostAskView } from "./PostAskView";

export class PostAsksView extends View<PostAsks> {

    private childrenDidMountFn: Function

    constructor(selector: string, escape: boolean = false) {
        super(selector, escape)
    }

    template(model: PostAsks): string {
        return `
        <div class="container" id="post-ask-inner-list">
            ${model.toArray().map((_, i) => `
                <div id="comment-${i}"></div>
            `).join('')}
        </div>
        `;
    }

    update(model: PostAsks) {
        super.update(model)

        const postList = document.getElementById('post-ask-inner-list')

        if (postList) {
            Array.from(postList.children).forEach((el, i) => {
                const view = new PostAskView(`#${el.getAttribute('id') || ''}`)
                const postAsk = model.toArray()[i]
                view.update(postAsk)

                view.didMount(this.childrenDidMountFn.bind(view))
            })
        }

        //if()
    }

    childrenDidMount(fn: Function) {
        this.childrenDidMountFn = fn
    }

}