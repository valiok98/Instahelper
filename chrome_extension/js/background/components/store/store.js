import { StoreState } from './store-state.js';
import { StoreReducers } from './store-reducers.js';

export class Store {
    constructor() {
        this._state = StoreState;
        this.reducers = new StoreReducers();
        this.subject = new rxjs.BehaviorSubject(this._state);
    }

    get state() {
        return this._state;
    }

    dispatch(action) {
        const componentName = action.type.split(':')[0],
            activityName = action.type.split(':')[1];
        this._state = this.reducers[componentName](this._state, activityName, action.payload);
        this.subject.next(this._state);
    }

    subscribe(observer) {
        this.subject.subscribe(observer);
    }

}