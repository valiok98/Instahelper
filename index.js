
import { Store } from './src/js/store/store';
import { InputHandle } from './src/component_input_handle/input_handle';
import { SubmitHandle } from './src/component_submit_handle/submit_handle';
import { LoadUser } from './src/component_load_user/load_user';

class Index {
    constructor() {
        const store = new Store();
        window.store = store;
        new InputHandle(store);
        new SubmitHandle(store);
        new LoadUser(store);
    }
}

window.onload = () => new Index();

// fetch('/js/api/get_followers/')
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

// fetch('/js/api/get_following/')
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

// fetch('/js/api/get_hashtags/')
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.error(err));



