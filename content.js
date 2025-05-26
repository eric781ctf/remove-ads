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

// 執行
(function () {
  removeAds();
  repositionNavigationLinks(); // 如果你想保留上一篇 / 下一篇釘在底部中央
})();
