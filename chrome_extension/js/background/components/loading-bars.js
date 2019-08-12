export class LoadingBars {
    constructor(store, instagram) {
        this.store = store;
        this.instagram = instagram;
        this.objects = document.querySelectorAll('.mdc-linear-progress');
        this.loadingElems = [];
        this.instantiate_objects();
    }

    instantiate_objects() {
        for (const obj of this.objects) {
            this.loadingElems.push(mdc.linearProgress.MDCLinearProgress.attachTo(obj));
        }
    }

    destroy_objects() {
        // Remove the loading bars.
        for (const elem of this.loadingElems) {
            elem.destroy();
            elem.root_.remove();
        }
    }

}