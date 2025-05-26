chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get('enabled', (data) => {
      if (data.enabled) {
        chrome.scripting.insertCSS({
          target: { tabId },
          files: ['style.css']
        });
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['content.js']
        });
      }
    });
  }
});
