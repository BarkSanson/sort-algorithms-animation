export default class Err {
    constructor(title) {
        this._title = title;
        Err.errors.push(title);
    }
    get title() {
        return this._title;
    }
    static cleanErrors() {
        var _a;
        // While there exist children into parent, we remove children
        Err.errors = [];
        while ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.firstChild) {
            this.parent.removeChild(this.parent.firstChild);
        }
    }
    render() {
        var _a;
        let err = document.createElement("li");
        err.classList.add("error");
        err.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${this._title}`;
        if (Err.errors.length > 5) {
            Err.errors.shift();
            (_a = Err.parent.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
        }
        Err.parent.appendChild(err);
    }
}
Err.parent = document.querySelector(".err-list");
Err.errors = [];
