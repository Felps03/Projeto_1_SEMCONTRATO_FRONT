System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, PaginationView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            PaginationView = class PaginationView extends View_1.View {
                constructor(selector, baseUrl, escape = false) {
                    super(selector, escape);
                    this.baseUrl = baseUrl;
                }
                set BaseUrl(baseUrl) {
                    this.baseUrl = baseUrl;
                }
                generatePageNs(actual, totalPages, perPage = 3) {
                    const half = Math.floor(perPage / 2);
                    let ns = [];
                    if (totalPages <= 1) {
                        ns.push(1);
                    }
                    else {
                        if (totalPages == 2) {
                            perPage = 2;
                        }
                        if (actual <= half) {
                            for (let i = 0; i < perPage; i++)
                                ns.push(i + 1);
                        }
                        else {
                            for (let i = actual - half; i <= actual + half; i++) {
                                if (totalPages >= i) {
                                    ns.push(i);
                                }
                            }
                        }
                    }
                    return ns;
                }
                template(model, totalPages, type, value) {
                    let result = "";
                    switch (type) {
                        case 0:
                            if (model > 1) {
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
                        case 1:
                            if (model > 1) {
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
                        case 2:
                            if (model > 1) {
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
                }
            };
            exports_1("PaginationView", PaginationView);
        }
    };
});
