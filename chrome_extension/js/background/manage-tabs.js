import { res } from './resources.js';
import { Instagram } from './instagram.js'
import { Main } from './main.js';

class ManageTabs {
    constructor() {
        res.setExtensionId(chrome.runtime.id);
        this.instagram = new Instagram();
        this.main = new Main();
        this.attach_handlers();
    }

    attach_handlers() {
        // Do not create new Instagram tab, if the user opens index manually.
        chrome.windows.getCurrent({ populate: true }, win => {
            // Check against the index.html from our chrome extension.
            for (const winTab of win.tabs) {
                // Leave if we already have an Instragram instance.
                if (res.instagramRegex.test(winTab.url)) {
                    this.instagram.tab = winTab;
                    this.instagram.get_session_id();
                    return;
                }
            }
            // Open an Instagram instance, if there are no others.
            this.instagram.create_tab();
        });
        // Handle closing of Instagram tabs.
        chrome.tabs.onRemoved.addListener((tabId, moveInfo) => {
            chrome.tabs.query({
                url: res.instagramUrls
            }, instaTabs => {
                // Check if we closed the last Instagram instance and close every Index.
                if (instaTabs.length === 0) {
                    chrome.tabs.query({
                        url: res.getIndexUrl()
                    }, indexTabs => {
                        for (const indexTab of indexTabs) {
                            chrome.tabs.remove(indexTab.id);
                        }
                    });
                } else if (tabId === this.instagram.tab.id) {
                    // The user closed the communicating Instagram instance.
                    // Change the instagramTabId to another running instance.
                    this.instagram.tab = instaTabs[0];
                }
            });
        });
        // Handle content script communication.
        chrome.runtime.onMessage.addListener(message => {
            console.log(message.scriptFunction)
            console.log('get-user-info:initialUserData')
            switch (message.scriptFunction) {
                case 'get-user-id:userId':
                    this.instagram.userId = message.userId;
                    break;
                case 'get-user-info:initialUserData':
                    this.main.add_count_items(message);
                    break;
                case 'get-user-info:fullUserData':
                    this.main.add_full_data(message);
                    break;
            }
        });
    }
}

new ManageTabs();
