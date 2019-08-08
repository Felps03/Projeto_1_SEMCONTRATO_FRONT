import { View } from './View';

export class PaginationView extends View<number> {

    private baseUrl: string
    private didMountFn: Function

    constructor(selector: string, baseUrl: string, escape: boolean = false) {
        super(selector, escape)

        this.baseUrl = baseUrl
    }
    set BaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    generatePageNs(actual: number, totalPages: number, perPage: number = 3): number[] {
        const half = Math.floor(perPage / 2)
        let ns = []
        if (totalPages <= 1) {
            ns.push(1);
        } else {
            if (totalPages == 2) {
                perPage = 2;
            }
            if (actual <= half) {
                for (let i = 0; i < perPage; i++)
                    ns.push(i + 1)
            } else {
                for (let i = actual - half; i <= actual + half; i++) {
                    if (totalPages >= i) {
                        ns.push(i)
                    }
                }
            }
        }
        return ns
    }

    template(model: number, totalPages: number, type: number, value?: string): string {

        // console.log(model);
        // console.log(totalPages);
        // console.log(this.generatePageNs(model, totalPages));
        // console.log(type);
        // console.log(value);
        let result = "";
        switch (type) {
            case 0: if (model > 1) {
                result += `
                        <li class="page-item">
                            <a class="page-link" href="${this.baseUrl}?page=${model - 1}&date=${value}" aria-label="Anterior">
                                <span aria-hidden="true" class="txt-primary">&laquo;</span>
                                <span class="sr-only txt-primary">Anterior</span>
                            </a>
                        </li>`;
            }
                result += `${this.generatePageNs(model, totalPages).map(n => `
                        <li class="page-item"><a class="page-link txt-primary" href="${this.baseUrl}?page=${n}&date=${value}">${n}</a></li>
                    `).join('')}`;
                if (totalPages > model) {
                    result += `<li class="page-item">
                        <a class="page-link" href="${this.baseUrl}?page=${model + 1}&date=${value}" aria-label="Próximo">
                            <span aria-hidden="true" class="txt-primary">&raquo;</span>
                            <span class="sr-only txt-primary">Próximo</span>
                        </a>
                    </li>`;
                }
                return result;
            case 1: if (model > 1) {
                result += `
                        <li class="page-item">
                            <a class="page-link" href="${this.baseUrl}?page=${model - 1}" aria-label="Anterior">
                                <span aria-hidden="true" class="txt-primary">&laquo;</span>
                                <span class="sr-only txt-primary">Anterior</span>
                            </a>
                        </li>`;
            }
                result += `${this.generatePageNs(model, totalPages).map(n => `
                        <li class="page-item"><a class="page-link txt-primary" href="${this.baseUrl}?page=${n}">${n}</a></li>
                    `).join('')}`;
                if (totalPages > model) {
                    result += `<li class="page-item">
                        <a class="page-link" href="${this.baseUrl}?page=${model + 1}" aria-label="Próximo">
                            <span aria-hidden="true" class="txt-primary">&raquo;</span>
                            <span class="sr-only txt-primary">Próximo</span>
                        </a>
                    </li>`;
                }
                return result;
            case 2: if (model > 1) {
                result += `
                        <li class="page-item">
                            <a class="page-link" href="${this.baseUrl}?page=${model - 1}&id=${value}" aria-label="Anterior">
                                <span aria-hidden="true" class="txt-primary">&laquo;</span>
                                <span class="sr-only txt-primary">Anterior</span>
                            </a>
                        </li>`;
            }
                result += `${this.generatePageNs(model, totalPages).map(n => `
                        <li class="page-item"><a class="page-link txt-primary" href="${this.baseUrl}?page=${n}&id=${value}">${n}</a></li>
                    `).join('')}`;
                if (totalPages > model) {
                    result += `<li class="page-item">
                        <a class="page-link" href="${this.baseUrl}?page=${model + 1}&id=${value}" aria-label="Próximo">
                            <span aria-hidden="true" class="txt-primary">&raquo;</span>
                            <span class="sr-only txt-primary">Próximo</span>
                        </a>
                    </li>`;
                }
                return result;
        }

        // let result: string = "";
        // if (dateValue) {
        //     if (model > 1) {
        //         result += `
        //         <li class="page-item">
        //             <a class="page-link" href="${this.baseUrl}?page=${model - 1}&date=${dateValue}" aria-label="Anterior">
        //                 <span aria-hidden="true" class="txt-primary">&laquo;</span>
        //                 <span class="sr-only txt-primary">Anterior</span>
        //             </a>
        //         </li>`;
        //     }
        //     result += `${this.generatePageNs(model, totalPages).map(n => `
        //         <li class="page-item"><a class="page-link txt-primary" href="${this.baseUrl}?page=${n}&date=${dateValue}">${n}</a></li>
        //     `).join('')}`;
        //     if (totalPages > model) {
        //         result += `<li class="page-item">
        //         <a class="page-link" href="${this.baseUrl}?page=${model + 1}&date=${dateValue}" aria-label="Próximo">
        //             <span aria-hidden="true" class="txt-primary">&raquo;</span>
        //             <span class="sr-only txt-primary">Próximo</span>
        //         </a>
        //     </li>`;
        //     }
        //     return result;
        // } else {
        //     if (model > 1) {
        //         result += `
        //         <li class="page-item">
        //             <a class="page-link" href="${this.baseUrl}?page=${model - 1}" aria-label="Anterior">
        //                 <span aria-hidden="true" class="txt-primary">&laquo;</span>
        //                 <span class="sr-only txt-primary">Anterior</span>
        //             </a>
        //         </li>`;
        //     }
        //     result += `${this.generatePageNs(model, totalPages).map(n => `
        //         <li class="page-item"><a class="page-link txt-primary" href="${this.baseUrl}?page=${n}">${n}</a></li>
        //     `).join('')}`;
        //     if (totalPages > model) {
        //         result += `<li class="page-item">
        //         <a class="page-link" href="${this.baseUrl}?page=${model + 1}" aria-label="Próximo">
        //             <span aria-hidden="true" class="txt-primary">&raquo;</span>
        //             <span class="sr-only txt-primary">Próximo</span>
        //         </a>
        //     </li>`;
        //     }
        //     return result;
        // }

    }

    update(model: number, totalPages: number = 0, type?: number, value?: string) {
        super.update(model, totalPages, type, value)

        if (this.didMountFn)
            this.didMountFn()
    }

    didMount(cb: Function) {
        this.didMountFn = cb
    }
}