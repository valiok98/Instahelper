import { StoreState } from './store-state.js';
import { StoreReducers } from './store-reducers.js';

export class Store {
    constructor() {
        this._state = StoreState;
        this.reducers = new StoreReducers(this._state);
        this.subject = new rxjs.BehaviorSubject(this._state);
    }

    get state() {
        return this._state;
    }

    dispatch(action, payload) {
        const activityName = action.split(':')[1];
        for (const component in this._state) {
            this._state = this.reducers[component](activityName, payload);
        }
        this.subject.next(this._state);
    }

    subscribe(observer) {
        this.subject.subscribe(observer);
    }

}