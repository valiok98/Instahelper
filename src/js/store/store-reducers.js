export class StoreReducers {
    constructor(state) {
        this.state = state;

        return {
            component_input_handle: (action, payload) => {
                const new_state = this.state;
                switch (action) {
                    case 'INPUT':
                        new_state.component_input_handle.value = payload.value;
                        break;
                }
                return new_state;
            },
            component_submit_handle: (action, payload) => {
                const new_state = this.state;
                switch (action) {
                    case 'CLICK':
                        new_state.component_submit_handle.clicked = true;
                        break;
                    case 'ENABLE':
                        new_state.component_submit_handle.disabled = false;
                        break;
                    case 'DISABLE':
                        new_state.component_submit_handle.disabled = true;
                        break;
                }
                return new_state;
            },
            component_load_user: (action, payload) => {
                const new_state = this.state;
                switch (action) {
                    case 'LOAD':
                        new_state.component_load_user.loading = true;
                        break;
                    case 'RESET':
                        new_state.component_load_user.loading = false;
                        break;
                    case 'SAVE':
                        new_state.component_load_user.userName = payload.userName;
                        new_state.component_load_user.userId = payload.userId;
                        new_state.component_load_user.userFollowers = payload.userFollowers;
                        new_state.component_load_user.userFollowing = payload.userFollowing;
                        new_state.component_load_user.userHashtags = payload.userHashtags;
                }
                return new_state;
            }
        };
    }


};