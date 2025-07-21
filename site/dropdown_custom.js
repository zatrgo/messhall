class HTMLDropdownElement extends HTMLElement {
    visible = false;
    height = 50;
    selected = null;
    selectdiv = null;
    options = [];
    optdiv = null;

    constructor() {
        super();
    }

    toggleView() {
        console.log(this.visible);
        this.visible = !this.visible;  
        this.optdiv.style.display = this.visible ? 'block' : 'none';

        if (this.visible)
            for (var element of document.getElementsByTagName("drop-down")) 
                if (element != this) element.setView(false);
    }

    setView(visible) {
        this.visible = visible;
        this.optdiv.style.display = this.visible ? 'block' : 'none';
    }

    select(e, obj) {
        this.selected = obj;
        this.selectdiv.innerHTML = this.selected.innerHTML;
    }

    connectedCallback() {
        if (this.hasAttribute("height")) this.height = this.getAttribute("height");
        //options
        this.options = this.querySelectorAll("option");
        this.selected = this.options[0]; 
        this.addEventListener("mousedown", this.toggleView);

        //Create selected div and set to the first option
        this.selectdiv = document.createElement("div");
        this.selectdiv.setAttribute('class', 'selected');
        this.appendChild(this.selectdiv);
        this.selectdiv.innerHTML = this.selected.innerHTML;
        
        //Create options div
        this.optdiv = document.createElement("div");
        this.optdiv.setAttribute('class', 'options');
        this.appendChild(this.optdiv);

        for (var opt of this.options) {
            opt.addEventListener("mousedown", this.select.bind(this, event, opt));
            this.optdiv.appendChild(opt);
        }

        var head = document.getElementsByTagName("head")[0].innerHTML;
        var rel = `<link rel="stylesheet" href="dropdown_custom.css">`;
        if (!head.includes(rel)) head += rel;
        document.getElementsByTagName("head")[0].innerHTML = head;
    
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