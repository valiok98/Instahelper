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
    components_terms_lists: {
        comments_length: 0,
        tags_length: 0,
        locations_length: 0,
        comments_list_values: [],
        tags_list_values: [],
        locations_list_values: []
    }
}