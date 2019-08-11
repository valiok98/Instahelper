export class TermsLists {
    constructor(store) {
        this.store = store;
        this.commentsListDOM = document.querySelector('.terms-list-comments');
        this.tagsListDOM = document.querySelector('.terms-list-tags');
        this.locationsListDOM = document.querySelector('.terms-list-locations');
        this.add_handlers();
    }

    add_list_item(value, type) {
        const li = document.createElement('li'),
            liInner = `<span class="mdc-list-item__text">${value}</span>
            <i class="material-icons">delete</i>`;

        li.classList.add('mdc-list-item');
        li.setAttribute('tabindex', '0');
        li.setAttribute('value', value);
        li.innerHTML = liInner;
        li.querySelector('i').addEventListener('click', e => {
            switch (type) {
                case 'COMMENT':
                    this.store.dispatch({
                        type: 'component_terms_lists:REMOVE_COMMENT',
                        payload: {
                            comment: value
                        }
                    });
                    break;
                case 'TAG':
                    this.store.dispatch({
                        type: 'component_terms_lists:REMOVE_TAG',
                        payload: {
                            tag: value
                        }
                    });
                    break;
                case 'LOCATION':
                    this.store.dispatch({
                        type: 'component_terms_lists:REMOVE_LOCATION',
                        payload: {
                            location: value
                        }
                    });
                    break;
            }

        });
        return li;
    }

    add_handlers() {
        this.store.subscribe(state => {
            const comments = state.component_terms_lists.comments_list_values,
                commentsList = this.commentsListDOM.querySelectorAll('.mdc-list>li');
            if (comments.length === commentsList.length - 1) {
                // We removed a comment from the list.
                let i = 0, j = 0;
                while (comments[i] === commentsList[j].getAttribute('value')) {
                    i++;
                    j++;
                }
                commentsList[j].remove();
            } else if (comments.length === commentsList.length + 1) {
                // We added a comment to the list.
                this.commentsListDOM.querySelector('.mdc-list')
                    .appendChild(this.add_list_item(comments[comments.length - 1], 'COMMENT'));
            }
        });

        this.store.subscribe(state => {
            const tags = state.component_terms_lists.tags_list_values,
                tagsList = this.tagsListDOM.querySelectorAll('.mdc-list>li');
            if (tags.length === tagsList.length - 1) {
                // We removed a tag from the list.
                let i = 0, j = 0;
                while (tags[i] === tagsList[j].getAttribute('value')) {
                    i++;
                    j++;
                }
                tagsList[j].remove();
            } else if (tags.length === tagsList.length + 1) {
                // We added a tag to the list.
                this.tagsListDOM.querySelector('.mdc-list')
                    .appendChild(this.add_list_item(tags[tags.length - 1], 'TAG'));
            }
        });

        this.store.subscribe(state => {
            const locations = state.component_terms_lists.locations_list_values,
                locationsList = this.locationsListDOM.querySelectorAll('.mdc-list>li');
            if (locations.length === locationsList.length - 1) {
                // We removed a location from the list.
                let i = 0, j = 0;
                while (locations[i] === locationsList[j].getAttribute('value')) {
                    i++;
                    j++;
                }
                locationsList[j].remove();
            } else if (locations.length === locationsList.length + 1) {
                // We added a location to the list.
                this.locationsListDOM.querySelector('.mdc-list')
                    .appendChild(this.add_list_item(locations[locations.length - 1], 'LOCATION'));
            }
        });

    }
}