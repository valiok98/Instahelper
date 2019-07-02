chrome.runtime.onInstalled.addListener(() => {
    chrome.browserAction.onClicked.addListener(function (tab) {

        chrome.tabs.create({
            url: 'https://www.instagram.com/venturemashup/'
        });

        chrome.tabs.create({
            url: './html/index.html'
        });

    });

});

