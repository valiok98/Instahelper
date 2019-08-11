export class ContentTabs {
    constructor(store) {
        this.store = store;
        this.object = mdc.tabBar.MDCTabBar.attachTo(document.querySelector('.mdc-tab-bar'));
    }

    destroy_object() {
        // Remove the loading bars.
        this.object.close()
        this.object.root_.remove();
    }

}