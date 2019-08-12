export class ContentTabs {
    constructor(store, instagram) {
        this.store = store;
        this.instagram = instagram;
        this.object = mdc.tabBar.MDCTabBar.attachTo(document.querySelector('.mdc-tab-bar'));
        this.attach_handlers();
    }

    attach_handlers() {
    }

    destroy_object() {
        // Remove the loading bars.
        this.object.destroy()
        this.object.root_.remove();
    }

}