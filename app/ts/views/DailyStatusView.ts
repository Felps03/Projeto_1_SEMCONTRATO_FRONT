import { View } from './View'

export class DailyStatusView extends View<string> {
    template(response: string, totalPages ?: number, type ?:number, typeAlert ?: string): string {
        
        return `
            <div class="alert ${typeAlert ? typeAlert: "alert-success"}  alert-dismissible fade show" role="alert">
                <strong>${response}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
    }

    
}
