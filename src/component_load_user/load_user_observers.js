export class LoadUserObservers {
    constructor(store) {
        this.store = store;

        this.reset_observer = {
            next: payload => {
                if (payload.valid === true) {
                    this.store.dispatch('component_load_user:RESET');
                }
            }
        };

        this.save_observer = {
            next: payload => {
                if (payload.valid === true) {
                    this.store.dispatch('component_load_user:SAVE', payload);
                } else {
                    this.store.dispatch('component_load_user:RESET');
                }
            }
        };

    }
}