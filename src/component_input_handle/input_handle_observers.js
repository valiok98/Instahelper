export class InputHandleObservers {

    constructor(store) {
        this.store = store;

        this.input_observer = {
            next: payload => {
                if (payload.valid === true) {
                    this.store.dispatch('component_input_handle:INPUT', payload);
                    this.store.dispatch('component_submit_handle:ENABLE');
                } else {
                    this.store.dispatch('component_submit_handle:DISABLE');
                }
            }
        };
    }
};