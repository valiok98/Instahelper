import { MainFunction } from './main.js';

const InstagramRegex = RegExp(`www\.instagram\.com`);
let instagramTabId;

// Do not create new Instagram tab, if the user opens index manually.
chrome.windows.getCurrent({ populate: true }, win => {
    // Check against the index.html from our chrome extension.
    for (const winTab of win.tabs) {
        // Leave if we already have an Instragram instance.
        if (InstagramRegex.test(winTab.url)) {
            instagramTabId = winTab.id;
            chrome.tabs.executeScript(instagramTabId, {
                file: './js/content/get-followers.js'
            });
            return;
        }
    }
    // Open an Instagram instance, if there are no others.
    chrome.tabs.create({
        url: 'https://www.instagram.com/'
    }, tab => {
        instagramTabId = tab.id;
        chrome.tabs.executeScript(instagramTabId, {
            file: './js/content/get-followers.js'
        }, results => {
            console.log(results);
        });
    });
});
// Handle closing of Instagram tabs.
chrome.tabs.onRemoved.addListener((tabId, moveInfo) => {
    chrome.tabs.query({
        url: [
            'https://www.instagram.com/',
            'https://www.instagram.com/*/'
        ]
    }, instaTabs => {
        // Check if we closed the last Instagram instance and close every Index.
        if (instaTabs.length === 0) {
            chrome.tabs.query({
                url: `chrome-extension://${chrome.runtime.id}/html/index.html`
            }, indexTabs => {
                for (const indexTab of indexTabs) {
                    chrome.tabs.remove(indexTab.id);
                }
            });
        } else if (tabId === instagramTabId) {
            // The user closed the communicating Instagram instance.
            // Change the instagramTabId to another running instance.
            instagramTabId = instaTabs[0].id;
        }
    });
});
// Handle movement of Instagram tabs.
chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
    console.log(instagramTabId);
});