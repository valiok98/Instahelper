const InstagramRegex = RegExp(`www\.instagram\.com`);
let IndexTabId,
    InstagramTabId;
// Do not create new Instagram tab, if the user opens index manually.
chrome.windows.getCurrent({ populate: true }, win => {
    // Check against the index.html from our chrome extension.
    for (const tab of win.tabs) {
        // Leave if we already have an Instragram instance.
        if (InstagramRegex.test(tab.url)) {
            InstagramTabId = tab.id;
            chrome.tabs.executeScript(InstagramTabId, {
                file: './js/injectables/get-followers.js'
            });
            return;
        }
    }
    // Open an Instagram instance, if there are no others.
    chrome.tabs.create({
        url: 'https://www.instagram.com/'
    }, tab => {
        InstagramTabId = tab.id;
        chrome.tabs.executeScript(InstagramTabId, {
            file: './js/injectables/get-followers.js'
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
        } else if (tabId === InstagramTabId) {
            // The user closed the communicating Instagram instance.
            // Change the InstagramTabId to another running instance.
            InstagramTabId = instaTabs[0].id;
        }
    });
});

// Handle movement of Instagram tabs.
chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
    console.log(InstagramTabId);
});