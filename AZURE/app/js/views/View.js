export class View {
    constructor(selector, escape = false) {
        const temp = document.querySelector(selector);
        if (temp) {
            this._el = temp;
        }
        else {
            throw new Error(`Element ${selector} not found`);
        }
        this._escape = escape;
    }
    update(model) {
        let template = this.template(model);
        if (this._escape)
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        this._el.innerHTML = template;
    }
}
