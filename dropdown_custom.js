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
        this.optdiv.style.display = this.visible ? null : 'none';

        if (this.visible)
            for (var element of document.getElementsByTagName("drop-down")) 
                if (element != this) element.setView(false);
    }

    setView(visible) {
        this.visible = visible;
        this.optdiv.style.display = this.visible ? null : 'none';
    }

    select(e, obj) {
        this.selected = obj;
        this.selectdiv.innerHTML = this.selected.innerHTML;
        if (obj.getAttribute("value") != null) this.selectedValue = obj.getAttribute("value");
        if (this.on_select != null) this.on_select();
    }

    updateOptions() {
        this.options = this.querySelectorAll("drop-option");
        var exists = false;
        for (var opt of this.options) {
            opt.addEventListener("mousedown", this.select.bind(this, event, opt));
            this.optdiv.appendChild(opt);
        }
        this.selected = this.options[0]; 
        this.selectdiv.innerHTML = this.selected.innerHTML;
    }
    
    connectedCallback() {
        
        this.addEventListener("mousedown", this.toggleView);

        
        //Create options div
        this.optdiv = document.createElement("div");
        this.optdiv.setAttribute('class', 'options');
        this.optdiv.style.display = 'none';
        this.appendChild(this.optdiv);
        
        //Create selected div and set to the first option
        this.selectdiv = document.createElement("div");
        this.selectdiv.setAttribute('class', 'selected');
        this.appendChild(this.selectdiv);
        
        //Add options into options div
        this.updateOptions();
        

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

    hasValue = false;
    value = null;

    constructor() {
        super();
    }

    connectedCallback() {
        this.value = this.getAttribute("value");
        this.hasValue = (this.value != null);
    }

    disconnectedCallback() {
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