import { InputHandleObservers } from './input_handle_observers';

import { MDCTextField } from '@material/textfield/index';
import { fromEvent } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';


export class InputHandle {
    constructor(store) {
        this.store = store;

        this.observers = new InputHandleObservers(this.store);
        this.object = document.getElementById('component_input_handle');
        // Apply MDC functionality/style.
        new MDCTextField(this.object);

        this.attach_handlers();
    }

    /**
     * Attach event handlers for the submit handle component.
     */
    attach_handlers() {
        const input = this.object.querySelector('#input--account');

        fromEvent(input, 'keyup')
            .pipe(
                distinctUntilChanged(),
                map(e => {
                    if (e.target.value === '') {
                        return { valid: false };
                    }
                    return { valid: true, value: e.target.value };
                })
            )
            .subscribe(this.observers.input_observer);
    }
}