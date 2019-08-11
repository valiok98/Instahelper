export class StoreReducers {
    constructor() {

        return {
            component_filter_terms: (state, activity, payload) => {



            },
            component_loading_bars: (state, activity, payload) => {

            },
            component_terms_lists: (state, activity, payload) => {
                switch (activity) {
                    case "ADD_COMMENT":
                        return {
                            ...state,
                            component_terms_lists: {
                                ...state.component_terms_lists,
                                comments_list_values: [
                                    ...state.component_terms_lists.comments_list_values,
                                    payload.comment
                                ]
                            }
                        };
                    case "REMOVE_COMMENT":
                        return {
                            ...state,
                            component_terms_lists: {
                                ...state.component_terms_lists,
                                comments_list_values:
                                    state.component_terms_lists.comments_list_values
                                        .filter(comment => comment !== payload.comment)
                            }
                        };
                    case "ADD_TAG":
                        return {
                            ...state,
                            component_terms_lists: {
                                ...state.component_terms_lists,
                                tags_list_values: [
                                    ...state.component_terms_lists.tags_list_values,
                                    payload.tag
                                ]
                            }
                        };
                    case "REMOVE_TAG":
                        return {
                            ...state,
                            component_terms_lists: {
                                ...state.component_terms_lists,
                                tags_list_values:
                                    state.component_terms_lists.tags_list_values
                                        .filter(tag => tag !== payload.tag)
                            }
                        };
                    case "ADD_LOCATION":
                        return {
                            ...state,
                            component_terms_lists: {
                                ...state.component_terms_lists,
                                locations_list_values: [
                                    ...state.component_terms_lists.locations_list_values,
                                    payload.location
                                ]
                            }
                        };
                    case "REMOVE_LOCATION":
                        return {
                            ...state,
                            component_terms_lists: {
                                ...state.component_terms_lists,
                                locations_list_values:
                                    state.component_terms_lists.locations_list_values
                                        .filter(location => location !== payload.location)
                            }
                        };
                }
            }
        };
    }


};