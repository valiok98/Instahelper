import { res } from './resources.js';
export class Instagram {
    constructor() {

    }
    set tab_by_id(tabId) {
        chrome.tabs.get(tabId, tab => {
            this.tab = tab;
        });
    }

    create_tab() {
        chrome.tabs.create({
            url: res.instagramUrls[0]
        }, tab => {
            this.tab = tab;
            this.get_session_id();
        });
    }

    get_session_id() {
        chrome.cookies.get({
            url: this.tab.url,
            name: 'sessionid'
        }, cookie => {
            if (cookie) {
                this.sessionId = cookie;
                this.execute_script();
                this.execute_script('all');
                return;
            }
        });
    }

    execute_script(type) {
        // The sent userId message will be set to this.userId by the manage-tabs.js script.
        // We retrieve the user's information from a background script because of CORB, since the
        // API hits i.intagram.com ---> CORS
        chrome.tabs.executeScript(this.tab.id, {
            file: './dist/get-user-id.min.js'
        }, _ => {
            res.get_user_information(this.userId)
                .then(res => {
                    let { userName, userBio, userPostCount, userFollowerCount, userFollowingCount, userProfilePicUrl }
                        = res;
                    switch (type) {
                        case 'all':
                            chrome.tabs.executeScript(this.tab.id, {
                                file: './dist/post-actions.min.js'
                            }, _ => {
                                chrome.tabs.sendMessage(this.tab.id, {
                                    action: 'post-actions',
                                    userId: this.userId,
                                    like: true,
                                    comment: true,
                                    recent: true,
                                    follow: true,
                                    unfollow: true,
                                    tag: true,
                                    location: false
                                });
                            });
                            break;
                        default:
                            chrome.tabs.executeScript(this.tab.id, {
                                file: './dist/get-user-info.min.js'
                            }, _ => {
                                chrome.tabs.sendMessage(this.tab.id, {
                                    action: 'get-user-info',
                                    userId: this.userId,
                                    userName,
                                    userBio,
                                    userPostCount,
                                    userFollowerCount,
                                    userFollowingCount,
                                    userProfilePicUrl
                                });
                            });
                            break;
                    }
                })
                .catch(err => console.log(err));
        });

    }
}