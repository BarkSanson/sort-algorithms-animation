export default class Err {
  private _title: string;
  private static parent: HTMLUListElement = document.querySelector(
    ".err-list"
  ) as HTMLUListElement;
  private static errors: string[] = [];

  constructor(title: string) {
    this._title = title;
    Err.errors.push(title);
  }

  get title() {
    return this._title;
  }

  public static cleanErrors() {
    // While there exist children into parent, we remove children
    Err.errors = [];
    while (this.parent?.firstChild) {
      this.parent.removeChild(this.parent.firstChild);
    }
  }

  public render() {
    let err = document.createElement("li");
    err.classList.add("error");
    err.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${this._title}`;

    if (Err.errors.length > 5) {
        Err.errors.shift();
        Err.parent.firstChild?.remove();
    }
    
    Err.parent.appendChild(err);
    
  }
}
