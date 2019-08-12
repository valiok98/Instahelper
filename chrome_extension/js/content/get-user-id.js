import { get_cookie } from './user-actions';

chrome.runtime.sendMessage({
    scriptFunction: 'get-user-id:userId',
    userId: parseInt(get_cookie('ds_user_id'))
});