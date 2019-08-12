export class TermsLists {
    constructor(store, instagram) {
        this.store = store;
        this.instagram = instagram;
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
            // Remove the DOM element.
            li.remove();
            switch (type) {
                case 'COMMENT':
                    this.store.dispatch({
                        type: 'component_terms_lists:REMOVE_COMMENT',
                        payload: {
                            comment: value
                        }
                    });
                    // Send a message to the Instagram tab with the removed comment.
                    chrome.tabs.sendMessage(this.instagram.tab.id, {
                        action: 'remove-comment',
                        comment: value
                    });
                    break;
                case 'TAG':
                    this.store.dispatch({
                        type: 'component_terms_lists:REMOVE_TAG',
                        payload: {
                            tag: value
                        }
                    });
                    // Send a message to the Instagram tab with the removed tag.
                    chrome.tabs.sendMessage(this.instagram.tab.id, {
                        action: 'remove-tag',
                        tag: value
                    });
                    break;
                case 'LOCATION':
                    this.store.dispatch({
                        type: 'component_terms_lists:REMOVE_LOCATION',
                        payload: {
                            location: value
                        }
                    });
                    // Send a message to the Instagram tab with the removed location.
                    chrome.tabs.sendMessage(this.instagram.tab.id, {
                        action: 'remove-location',
                        location: value
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
            // We added a comment to the list.
            if (comments.length === commentsList.length + 1) {
                // Send a message to the Instagram tab with the new comment.
                chrome.tabs.sendMessage(this.instagram.tab.id, {
                    action: 'add-comment',
                    comment: comments[comments.length - 1]
                });
                // Update the store.
                this.commentsListDOM.querySelector('.mdc-list')
                    .appendChild(this.add_list_item(comments[comments.length - 1], 'COMMENT'));
            }
        });

        this.store.subscribe(state => {
            const tags = state.component_terms_lists.tags_list_values,
                tagsList = this.tagsListDOM.querySelectorAll('.mdc-list>li');
            // We added a tag to the list.
            if (tags.length === tagsList.length + 1) {
                // Send a message to the Instagram tab with the new tag.
                chrome.tabs.sendMessage(this.instagram.tab.id, {
                    action: 'add-tag',
                    tag: tags[tags.length - 1]
                });
                // Update the store.
                this.tagsListDOM.querySelector('.mdc-list')
                    .appendChild(this.add_list_item(tags[tags.length - 1], 'TAG'));
            }
        });

        this.store.subscribe(state => {
            const locations = state.component_terms_lists.locations_list_values,
                locationsList = this.locationsListDOM.querySelectorAll('.mdc-list>li');
            // We added a location to the list.
            if (locations.length === locationsList.length + 1) {
                // Send a message to the Instagram tab with the new location.
                chrome.tabs.sendMessage(this.instagram.tab.id, {
                    action: 'add-location',
                    location: locations[locations.length - 1]
                });
                // Update the store.
                this.locationsListDOM.querySelector('.mdc-list')
                    .appendChild(this.add_list_item(locations[locations.length - 1], 'LOCATION'));
            }
        });

    }
}