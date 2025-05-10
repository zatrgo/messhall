class HTMLDropdownElement extends HTMLElement {
    constructor() {
        super();
        this.items = [];
        this.select = document.createElement("div");
    }

    connectedCallback() {
        console.log("Custom element added to page.");

        items = this.getElementsByTagName(Option);
        

        this.innerHTML = `
            <style>
                dropdown {
                    --select_height: 50px;
                    height: var(--select_height);
                    width: 100%;
                    margin: auto;
                    overflow: hidden;
                    position: relative;
                    z-index: 0;
                }

                dropdown #select {
                    display: inline-block;
                    position: absolute;
                    width: 52%;
                    height: 100%;
                    right: 0;
                }

                .dropdown_custom_item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: calc(var(--select_height)+1px);
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    
                    h4 {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: inherit;
                        height: 100%;
                        font-size: calc(var(--select_height)/2);
                    }
                    img {
                        min-width: var(--select_height);
                        height: var(--select_height);
                        display: block;
                        object-fit: cover;
                        align-items: center;
                        float: right;
                    }
                }

                .dropdown_custom_list {
                    --item-height: calc(var(--select_height)*0.8);
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    right: -5px;
                    width: 52%;
                    height: max-content;
                    
                    .dropdown_custom_item {
                        position: relative;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: calc(var(--item-height)+1);
                        padding: 0;

                        h4 {
                            font-size: calc(var(--item-height)/2);
                            height: 100%;
                        }
                        img {
                            min-width: var(--item-height);
                            height: var(--item-height);
                            display: block;
                            object-fit: cover;
                        }
                    }
                }
                .dropdown_custom_item:hover h4 {
                }

            </style>
            <div class="dropdown">
                <button>${this.getAttribute("title")}</button>
                <div class="dropdown-content">
                    <slot></slot>
                </div>
            </div>`;
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




customElements.define("dropdown", HTMLDropdownElement);