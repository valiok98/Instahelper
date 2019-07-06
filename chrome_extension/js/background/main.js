
export class Main {
    constructor() {
        this.loadingElems = document.querySelectorAll('.mdc-linear-progress');

        this.add_loading_bars();
    }

    add_loading_bars() {
        for (let  elem of this.loadingElems) {
            // elem = new MDCLinearProgress(elem);
        }
    }

    add_count_items() {
        const parentElems = document.querySelectorAll('.data-count-item');
        // Remove the loading bars.
        for (const elem of this.loadingElems) {
            // elem.close()
            // elem.remove();
        }

    }

}