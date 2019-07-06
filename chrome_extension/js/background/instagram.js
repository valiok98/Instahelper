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
                return;
            }
            // Notify user about the Login or missing 'sessionid' cookie.
            this.signal_missing_session_id();
        });
    }

    execute_script(scriptRelativePath) {
        // The sent userId message will be set to this.userId by the manage-tabs.js script.
        // We retrieve the user's information from a background script because of CORB, since the
        // API hits i.intagram.com ---> CORS
        chrome.tabs.executeScript(this.tab.id, {
            file: './dist/get-user-id.min.js'
        }, _ => {
            res.get_user_information(this.userId)
                .then(res => {
                    let { userBio, userPostCount, userFollowerCount, userFollowingCount, userProfilePicUrl }
                        = res;
                    switch (scriptRelativePath) {
                        case 'follow':
                            break;
                        default:
                            chrome.tabs.executeScript(this.tab.id, {
                                file: './dist/get-user-info.min.js'
                            }, _ => {
                                chrome.tabs.sendMessage(this.tab.id, {
                                    userId: this.userId,
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

    signal_missing_session_id() {
        const errorMessage = document.createElement('h1');
        errorMessage.textContent = `Please log in to your instagram account
        or check that you have a cookie named sessionid.`;
        errorMessage.style.width = '50%';
        // Remove all children.
        for (const child of document.body.children) {
            child.remove();
        }
        // Append the child and add styles.
        document.body.appendChild(errorMessage);
        document.body.className = 'message-to-login';
    }

}