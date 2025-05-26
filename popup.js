const toggleBtn = document.getElementById('toggle-btn');

async function getTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

function updateButton(isEnabled) {
  toggleBtn.textContent = isEnabled ? 'Stop' : 'Active';
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
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['style.css']
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  } else {
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
