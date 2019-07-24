import { View } from './View';

export class PaginationView extends View<number> {

    private baseUrl: string

    constructor(selector: string, baseUrl: string, escape: boolean = false) {
        super(selector, escape)

        this.baseUrl = baseUrl
    }

    generatePageNs(actual: number, perPage: number = 3): number[] {
        const half = Math.floor(perPage / 2)
        let ns = []
        if (actual <= half) {
            for (let i = 0; i < perPage; i++)
                ns.push(i + 1)
        } else {
            for (let i = actual - half; i <= actual + half; i++) {
                ns.push(i)
            }
        }

        return ns
    }

    template(model: number): string {

       // console.log(model)
       // console.log(this.generatePageNs(model))

        return `
        <li class="page-item">
            <a class="page-link" href="${this.baseUrl}?page=${model - 1}" aria-label="Anterior">
                <span aria-hidden="true" class="txt-primary">&laquo;</span>
                <span class="sr-only txt-primary">Anterior</span>
            </a>
        </li>

        ${this.generatePageNs(model).map(n => `
            <li class="page-item"><a class="page-link txt-primary" href="${this.baseUrl}?page=${n}">${n}</a></li>
        `).join('')}
        
        <li class="page-item">
            <a class="page-link" href="${this.baseUrl}?page=${model + 1}" aria-label="Próximo">
                <span aria-hidden="true" class="txt-primary">&raquo;</span>
                <span class="sr-only txt-primary">Próximo</span>
            </a>
        </li>
        `;
    }
}