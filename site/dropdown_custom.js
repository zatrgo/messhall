class HTMLDropdownElement extends HTMLElement {
    visible = false;
    selected = null;
    selectdiv = null;
    options = [];
    optdiv = null;

    on_select = null;

    constructor() {
        super();
    }

    toggleView() {
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
        console.log("Selected: ", obj);
        this.selected = obj;
        this.selectdiv.innerHTML = this.selected.innerHTML;
        if (this.on_select != null) this.on_select();
    }

    connectedCallback() {
        //options
        this.options = this.querySelectorAll("drop-option");
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

        let onselect = this.getAttribute("on-select");
        if (onselect != null) {
            var func = onselect.split("(")[0];
            var argstring = onselect.split("(")[1].trim();
            var argsplits = argstring.replace(")", "").split(",");

            var args = [];
            for (var arg of argsplits) {
                if (arg == 'this') args.push(this);
                else args.push(window[arg]);
            }
            this.on_select = () => {window[func](...args);}
        }
    }
    disconnectedCallback() {
        console.log("Drop down element removed from page.");
    }
    connectedMoveCallback() {
        console.log("Drop down element moved with moveBefore()");
    }
    adoptedCallback() {
        console.log("Drop down element moved to new page.");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

}

class HTMLDropOptionELement extends HTMLElement {

    value = null;

    constructor() {
        super();
    }

    connectedCallback() {
        this.value = this.getAttribute("value");
    }

    disconnectedCallback() {
        console.log("Drop option element removed from page.");
    }
    connectedMoveCallback() {
        console.log("Drop option element moved with moveBefore()");
    }
    adoptedCallback() {
        console.log("Drop option element moved to new page.");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}

customElements.define("drop-down", HTMLDropdownElement);
customElements.define("drop-option", HTMLDropOptionELement);