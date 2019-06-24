define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputWrapper = (function () {
        function InputWrapper(el) {
            this.el = el;
            this.msgDiv = el.nextElementSibling;
        }
        InputWrapper.prototype.setValid = function (valid, msg) {
            this.el.classList.remove('is-valid');
            this.el.classList.remove('is-invalid');
            this.el.classList.add(valid ? 'is-valid' : 'is-invalid');
            this.msgDiv.className = valid
                ? 'valid-feedback'
                : 'invalid-feedback';
            if (msg !== undefined)
                this.setMsg(msg);
        };
        InputWrapper.prototype.setMsg = function (msg) {
            this.msgDiv.textContent = msg;
        };
        Object.defineProperty(InputWrapper.prototype, "value", {
            get: function () {
                return this.el.value;
            },
            enumerable: true,
            configurable: true
        });
        InputWrapper.fromId = function (id) {
            return new InputWrapper(document.getElementById(id));
        };
        return InputWrapper;
    }());
    exports.InputWrapper = InputWrapper;
});
//# sourceMappingURL=InputWrapper.js.map