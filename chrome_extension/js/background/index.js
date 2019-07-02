chrome.runtime.onInstalled.addListener(() => {
    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.browserAction.setTitle({ title: 'Tame Impala' }, () => {
            chrome.storage.local.set({ count: 123 });
        });

        window.open('https://www.instagram.com/');
        window.open('./html/index.html');
    });

});

