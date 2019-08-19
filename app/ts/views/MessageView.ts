import { View } from './View'

export class MessageView extends View<string> {
    template(model: string): string {
        return `<div class="alert alert-success alert-dismissible fade show" role="alert">${model}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>` 
    }
}
