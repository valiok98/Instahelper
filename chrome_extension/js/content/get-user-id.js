import { get_cookie } from './post-user-actions';

chrome.runtime.sendMessage({
    script: 'get-user-id',
    userId: parseInt(get_cookie('ds_user_id'))
});