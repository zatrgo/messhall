class HTMLDropdownElement extends HTMLElement {
    constructor() {
        super();
        this.visible = false;
        this.options = [];
        self.addEventListener("click", toggleView());
    }
    
    toggleView() {
        this.visible = !this.visible;
        
    }
    
    connectedCallback() {
        this.options = self.getElementsByTagName("option");
        
        for (const item of items) {
            item.addEventListener("hover");
            item.addEventListener("click");
            
        }
    } 
}