/**
 * The initial state of the store.
 * Keep an entry for every component in the store.
 */
export const StoreState = {
    component_loading_bars: {
        loading: true,
        profilePicUrl: '',
        postCount: undefined,
        followerCount: undefined,
        followingCount: undefined
    },
    component_filter_terms: {
        comments_value: '',
        tags_value: '',
        locations_value: ''
    },
    component_terms_lists: {
        comments_list_values: [],
        tags_list_values: [],
        locations_list_values: []
    }
}