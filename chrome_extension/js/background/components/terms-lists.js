export class TermsLists {
    constructor(store) {
        this.store = store;
        this.commentsList = document.querySelector('.terms-list-comments');
        this.tagsList = document.querySelector('.terms-list-tags');
        this.locationsList = document.querySelector('.terms-list-locations');
        this.add_handlers();
    }


    add_handlers() {


        this.store.subscribe(state => {
            const commentsLength = state.component_terms_lists.comments_length,
                tagsLength = state.component_terms_lists.tags_length,
                locationsLength = state.component_terms_lists.locations_length,
                commentsList = state.component_terms_lists.comments_list_values,
                tagsList = state.component_terms_lists.tags_list_values,
                locationsList = state.component_terms_lists.locations_list_values;
            const 
            if (commentsLength === commentsList.length + 1) {
                // We removed a comment from the list.


            }else if(commentsLength === commentsList.length - 1) {
                // We added a comment to the list.

            }
        });

    }
}