export abstract class View<T> {

    protected _el: HTMLElement;
    private _escape: boolean;

    constructor(selector: string, escape: boolean = false) {

        const temp: HTMLElement | null = document.querySelector(selector);
        if (temp) {
            this._el = temp
        } else {
            throw new Error(`Element ${selector} not found`)
        }

        this._escape = escape;
    }

    update(model: T, totalPages: number = 0, dateValue?:string) {
        let template = this.template(model, totalPages, dateValue);
        if (this._escape)
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        this._el.innerHTML = template;
    }

    abstract template(model: T, totalPages: number, dateValue?:string): string;

}