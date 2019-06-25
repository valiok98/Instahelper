import { SubmitHandleObservers } from './submit_handle_observers';

import { MDCRipple } from '@material/ripple';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export class SubmitHandle {
    constructor(store) {
        this.store = store;
        this.observers = new SubmitHandleObservers(this.store);
        this.object = document.getElementById('component_submit_handle');
        // Apply MDC functionality/style.
        new MDCRipple(this.object);

        this.attach_handlers();
    }

    /**
     * Attach event handlers for the submit handle component.
     */
    attach_handlers() {
        const button = this.object.querySelector('button');

        fromEvent(button, 'click')
            .pipe(
                map(_ => {
                    const inputHandle = this.store.state.component_input_handle.value;
                    if (inputHandle !== '') {
                        console.log(inputHandle);
                        return { valid: true, inputHandle};
                    }
                    return { valid: false };
                })
            ).subscribe(this.observers.submit_observer);


        this.store.subscribe(state => {
            button.disabled = state.component_submit_handle.disabled;
        });
    }
}