export class StoreReducers {
    constructor(state) {
        this.state = state;

        return {
            component_filter_terms: (activity, payload) => {
                switch (activity) {
                    case "ADD":
                        return {
                            ...this.state,
                            component_terms_lists: {
                                comments_list_values: [
                                    ...this.state.component_terms_lists.coments_list_values,
                                    payload.comment
                                ]
                            }
                        };
                    case "REMOVE":
                        return {
                            ...this.state,
                            component_terms_lists: {
                                comments_list_values:
                                    this.state.component_terms_lists.comments_list_values
                                        .filter(comment => comment !== payload.comment)
                            }
                        };
                }
            },
            component_loading_bars: (activity, payload) => {

            },
            component_terms_lists: (activity, payload) => {

            }
        };
    }


};