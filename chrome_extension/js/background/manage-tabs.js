import { res } from './resources.js';
import { Instagram } from './instagram.js'

class ManageTabs {
    constructor() {
        res.setExtensionId(chrome.runtime.id);
        this.instagram = new Instagram();


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
                    this.get_session_id();
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
            if (message.script === 'get-user-id') {
                this.instagram.userId = message.userId;
            } else if (message.script === 'get-user-info') {
                console.log(message);
            }
        });



    }
}

new ManageTabs();
