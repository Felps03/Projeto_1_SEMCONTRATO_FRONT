import { View } from './View';

export class headerPaginationView extends View<String> {

    template(): string {
        return `
            <nav aria-label="daily-nav" class="float-right">
            <ul class="pagination">
                <li class="page-item">
            </a>
            </li>
        `;
    }
}