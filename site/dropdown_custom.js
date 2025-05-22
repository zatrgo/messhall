class HTMLDropdownElement extends HTMLElement {

    visible = false;
    options = [];
    height = 50;
    selected = 0;
    selectdiv = null;
    optdiv = null;

    constructor() {
        super();

        this.height = 50;

    }

    toggleView() {
        this.visible = !this.visible;
        if (this.visible) this.optdiv.setAttribute('style', "display:block");
        else this.optdiv.setAttribute('style', "display:none");
    }

    select(obj) {
        console.log(obj.value);
        
        this.selected.innerHTML = obj.getAttribute('value'); 
        this.toggleView();
    }

    connectedCallback() {
        console.log("Custom element added to page.");
        if (this.hasAttribute("height")) this.height = this.getAttribute("height");

        this.options = this.querySelectorAll("option");

        this.selected = document.createElement("div");
        this.appendChild(this.selected);
        
        this.optdiv = document.createElement("div");
        this.appendChild(this.optdiv);

        this.addEventListener("mousedown", this.toggleView);


        for (var opt of this.options) {
            opt.addEventListener("mousedown", () => {this.select(opt);});
            this.optdiv.appendChild(opt);
        }
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    connectedMoveCallback() {
        console.log("Custom element moved with moveBefore()");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

}




customElements.define("drop-down", HTMLDropdownElement);