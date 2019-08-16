import { View } from './View'
import { scrollIntoViewIfNotInView } from '../utils/scrollIntoView';

export class MessageView extends View<string> {
    template(model: string, type: string = 'success'): string {
        return `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${model}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
    }

    update(model: string, type: string = 'success') {
        super.update(model, type)

        scrollIntoViewIfNotInView(this._el)
    }
}
