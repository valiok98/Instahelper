export class SubmitHandleObservers {
    constructor(store) {
        this.store = store;

        this.submit_observer = {
            next: payload => {
                if (payload.valid === true) {
                    this.store.dispatch('component_load_user:LOAD');
                } else {
                    this.store.dispatch('component_submit_handle:DISABLE');
                }
            }
        };
    }
}