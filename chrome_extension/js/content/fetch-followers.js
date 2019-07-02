const h1 = document.querySelector('h1'),
    button = document.querySelector('button');

const InstagramRegex = RegExp(`www\.instagram\.com`);

chrome.windows.getCurrent({ populate: true }, win => {
    // Check against the index.html from our chrome extension.
    for (const tab of win.tabs) {
        // Leave if we already have an Instragram instance.
        if (InstagramRegex.test(tab.url)) {
            return;
        }
    }
    // Open an Instagram instance, if there are no others.
    chrome.tabs.create({
        url: 'https://www.instagram.com/'
    }, tab => {
        chrome.tabs.executeScript(tab.id, {
            file: './js/injectables/get-followers.js'
        });
    });
});

// Handle closing of tabs.
chrome.tabs.onRemoved.addListener((tabId, moveInfo) => {
    chrome.tabs.query({
        url: [
            'https://www.instagram.com/',
            'https://www.instagram.com/*/'
        ]
    }, instaTabs => {
        // Check if we closed the last Instagram instance and close index.
        if (instaTabs.length === 0) {
            chrome.tabs.query({
                url: `chrome-extension://${chrome.runtime.id}/html/index.html`
            }, indexTabs => {
                for (const indexTab of indexTabs) {
                    chrome.tabs.remove(indexTab.id);
                }
            });
        }
    });
});

chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
    chrome.tabs.query({
        url: [
            'https://www.instagram.com/',
            'https://www.instagram.com/*/'
        ]
    }, tabs => {
        if (tabs.length !== 0) {

            h1.textContent = 'HEllo';

            chrome.tabs.executeScript(tabs[0].id, {
                file: '../injectables/get-followers.js'
            });

        }
    });
});