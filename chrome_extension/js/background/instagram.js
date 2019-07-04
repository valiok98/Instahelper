import { res } from './resources.js';
export class Instagram {
    constructor() {

    }

    create_tab() {
        chrome.tabs.create({
            url: res.instagramUrls[0]
        }, tab => {
            this.tab = tab;
            this.get_session_id();
        });
    }

    set tab_by_id(tabId) {
        chrome.tabs.get(tabId, tab => {
            this.tab = tab;
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
        switch (scriptRelativePath) {
            case 'follow':
                break;
            default:
                chrome.tabs.executeScript(this.tab.id, {
                    file: './dist/navigate-profile.min.js'
                });
                break;
        }
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