export const res = (() => {

    let extensionId;
    const instagramRegex = RegExp(`www\.instagram\.com`);
    const instagramUrls = [
        'https://www.instagram.com/',
        'https://www.instagram.com/*/'
    ];
    const setExtensionId = _extensionId => {
        extensionId = _extensionId;
    };
    const getIndexUrl = () => {
        return `chrome-extension://${extensionId}/html/index.html`;
    }

    return {
        instagramRegex,
        instagramUrls,
        setExtensionId,
        getIndexUrl
    };
})();