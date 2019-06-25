import { LoadUserObservers } from './load_user_observers';
import { LoadUserController } from './load_user_controller';
import { from, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

export class LoadUser {
    constructor(store) {
        this.store = store;

        this.observers = new LoadUserObservers(this.store);
        this.controller = LoadUserController;
        this.object = document.getElementById('component_load_user');
        this.attach_handlers();
    }

    /**
     * Attach event handlers for the submit handle component.
     */
    attach_handlers() {
        const userNameDom = this.object.querySelector('#user_name'),
            userIdDom = this.object.querySelector('#user_id'),
            userFollowersDom = this.object.querySelector('#user_followers'),
            userFollowingDom = this.object.querySelector('#user_following');

        this.store.subscribe(state => {
            if (state.component_load_user.loading === true) {
                const inputHandle = state.component_input_handle.value,
                    payload = { valid: inputHandle !== '', inputHandle };
                // Set the loading property back to false.
                of({ valid: true }).subscribe(this.observers.reset_observer);

                

                from(this.controller.get_user_id(payload))
                    .pipe(
                        map(res => {
                            const userName = res.graphql.user.username,
                                userId = res.graphql.user.id;

                            userNameDom.textContent = userName;
                            userIdDom.textContent = userId;

                            return { valid: true, userName, userId, userFollowers: [], userFollowing: [] };
                        })
                    )
                    .subscribe(this.observers.save_observer);
            }
        });
    }
}