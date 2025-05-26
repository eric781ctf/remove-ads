function removeAds() {
  const selectors = [
    '#ad-ad9top3',
    '#ad-ad6ins1p1',
    '#ad-ad6ins2p2',
    '#ad-ad9bottom3',
    '.tpb-author',
    'iframe[src*="ads"]',
    'div[data-gc-test-id]'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.remove();
    });
  });
}

function repositionNavigationLinks() {
  const navSection = document.querySelector('.prev')?.parentElement;
  if (navSection) {
    navSection.style.position = 'fixed';
    navSection.style.bottom = '10px';
    navSection.style.left = '50%';
    navSection.style.transform = 'translateX(-50%)';
    navSection.style.zIndex = '99999';
    navSection.style.background = 'white';
    navSection.style.padding = '10px';
    navSection.style.border = '1px solid #ccc';
    navSection.style.borderRadius = '8px';
  }
}

function watchForDynamicAds() {
  const observer = new MutationObserver(() => {
    removeAds();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// 執行
(function () {
  removeAds();
  repositionNavigationLinks();
  watchForDynamicAds();
})();

// 改為強制刷新，確保下一頁重新載入 content script
document.querySelectorAll('.prev a, .next a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    location.href = a.href;
  });
});
