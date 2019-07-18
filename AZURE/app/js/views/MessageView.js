import { View } from './View';
export class MessageView extends View {
    template(model) {
        return `<p class="alert alert-warning">${model}</p>`;
    }
}
