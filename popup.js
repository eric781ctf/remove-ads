const toggleBtn = document.getElementById('toggle-btn');

async function getTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

// 更新按鈕文字
function updateButton(isEnabled) {
  toggleBtn.textContent = isEnabled ? '停用功能' : '啟用功能';
}

chrome.storage.local.get('enabled', async (data) => {
  const isEnabled = data.enabled ?? false;
  updateButton(isEnabled);
});

toggleBtn.addEventListener('click', async () => {
  const tab = await getTab();
  const { enabled } = await chrome.storage.local.get('enabled');
  const newState = !enabled;

  if (newState) {
    // 啟用：注入 content.js 和 style.css
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['style.css']
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  } else {
    // 停用：重新整理頁面 (或是你要寫個移除釘選區的代碼也可以)
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const pinned = document.getElementById('pinned-ads');
        if (pinned) pinned.remove();
      }
    });
  }

  await chrome.storage.local.set({ enabled: newState });
  updateButton(newState);
});
