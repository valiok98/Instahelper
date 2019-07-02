const h1 = document.querySelector('h1'),
    button = document.querySelector('button');

const IgRegex = RegExp('instagram\.com');

let Tab = {
    id: -1,
    index: -1
}

chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
    chrome.tabs.query({
        url: 'https://*.instagram.com/*'
    }, tabs => {
        if (tabs.length !== 0) {
            h1.textContent = tabs[0].index;
        }
    });
});