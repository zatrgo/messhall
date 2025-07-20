class HTMLDropdownElement extends HTMLElement {
    visible = false;
    options = [];
    height = 50;
    selected = null;
    container = null
    optdiv = null;
    optdivHeight = "";
    optdivWidth = "";

    constructor() {
        super();
    }

    toggleView() {
        console.log(this.visible);
        this.visible = !this.visible;  
        this.optdiv.style.display = this.visible ? 'block' : 'none';
        this.optdiv.style.top = this.optdivHeight;
        this.optdiv.style.left = this.optdivWidth;

        if (this.visible)
            for (var element of document.getElementsByTagName("drop-down")) 
                if (element != this) element.setView(false);
    }

    setView(visible) {
        this.visible = visible;
        this.optdiv.style.display = this.visible ? 'block' : 'none';
        this.optdiv.style.top = this.optdivHeight;
        this.optdiv.style.left = this.optdivWidth;
        this.style.zIndex = this.visible ? 100 : 0;


        //this.optdiv.setAttribute('style', `display:${this.visible?'block':'none'}`);
        //this.setAttribute('style', `z-index:${this.visible?100:0};`);
    }

    select(e, obj) {
        this.selected = obj;
        this.innerHTML = this.selected.innerHTML;
    }

    connectedCallback() {
        if (this.hasAttribute("height")) this.height = this.getAttribute("height");
        //options
        this.options = this.querySelectorAll("option");

        //Set default option as selected, set to dropdown
        this.selected = this.options[0];
        this.innerHTML = this.selected.innerHTML;
        
        //Create the dropdown container if it doesn't exist already 
        var con = document.getElementsByClassName("dropdown_container"); 
        if (con.length > 0) this.container = con[0];
        else {
            this.container = document.createElement("div");
            this.container.setAttribute('class', 'dropdown_container');
            document.body.appendChild(this.container);
        }

        this.optdiv = document.createElement("div");
        this.optdiv.setAttribute('class', 'dropdown_options');
        this.optdiv.setAttribute('id', this.getAttribute("id") + "_options");
        this.container.appendChild(this.optdiv);

        var offset = getOffset(this);
        console.log(offset);
        this.optdivHeight = offset.top + "px";
        this.optdivWidth = offset.left + "px";

        this.addEventListener("mousedown", this.toggleView);


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

function getOffset(el) {

    var b = el.getBoundingClientRect();
    var result = {top:b.top, left:b.left};
    var parent = el.parentElement;

    if (parent == document.body) return result;
    else {
        var result2 = getOffset(parent);
        result.top += result2.top;
        result.left += result2.left;
        return result;
    }
    
}


customElements.define("drop-down", HTMLDropdownElement);