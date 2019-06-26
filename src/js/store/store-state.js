/**
 * The initial state of the store.
 * Keep an entry for every component in the store.
 */
export const StoreState = {
    component_input_handle: {
        value: ''
    },
    component_submit_handle: {
        disabled: true
    },
    component_load_user: {
        loading: false,
        userName: '',
        userId: '',
        userFollowers: [],
        userFollowing: [],
        userHashtags: []
    }

}