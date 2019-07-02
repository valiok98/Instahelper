chrome.runtime.onInstalled.addListener(() => {
    chrome.browserAction.onClicked.addListener(tab => {
        chrome.windows.getCurrent({ populate: true }, win => {
            // Check against the index.html from our chrome extension.
            const IndexRegex = RegExp(`${chrome.runtime.id}/html/index.html`);
            for (const tab of win.tabs) {
                // Return if we already have a running index.html instance.
                if (IndexRegex.test(tab.url)) {
                    return;
                }
            }
            // Open the tab through javascript, window is the glbal object.
            window.open('./html/index.html');
        });
    });
});

