export class InputWrapper {
    constructor(el) {
        this.el = el;
        this.msgDiv = el.nextElementSibling;
    }
    setValid(valid, msg) {
        this.el.classList.remove('is-valid');
        this.el.classList.remove('is-invalid');
        this.el.classList.add(valid ? 'is-valid' : 'is-invalid');
        this.msgDiv.className = valid
            ? 'valid-feedback'
            : 'invalid-feedback';
        if (msg !== undefined)
            this.setMsg(msg);
    }
    setMsg(msg) {
        this.msgDiv.textContent = msg;
    }
    get value() {
        return this.el.value;
    }
    static fromId(id) {
        return new InputWrapper(document.getElementById(id));
    }
}
