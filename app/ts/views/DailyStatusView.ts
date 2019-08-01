import { View } from './View'

export class DailyStatusView extends View<string> {
    template(response: string): string {
        return `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>${response}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
    }
}
