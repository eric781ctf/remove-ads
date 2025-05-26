function createPinnedArea() {
  if (document.getElementById('pinned-ads')) return;

  const pinnedArea = document.createElement('div');
  pinnedArea.id = 'pinned-ads';
  document.body.appendChild(pinnedArea);
}

function removeAndPinAds() {
  const selectors = [
    '#ad-ad9top3',
    '#ad-ad6ins1p1',
    '#ad-ad6ins2p2',
    '#ad-ad9bottom3',
    '.tpb-author',
    'iframe[src*="ads"]',
    'div[data-gc-test-id]'
  ];

  const pinnedArea = document.getElementById('pinned-ads');

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      const clone = el.cloneNode(true);
      clone.style.marginBottom = '10px';
      pinnedArea.appendChild(clone);
      el.remove();
    });
  });
}

function addNavigationLinks() {
  const prevLink = document.querySelector('.prev a');
  const nextLink = document.querySelector('.next a');

  if (prevLink || nextLink) {
    const navContainer = document.createElement('div');
    navContainer.id = 'pinned-nav';

    if (prevLink) {
      const prev = prevLink.cloneNode(true);
      prev.textContent = '上一篇';
      navContainer.appendChild(prev);
    }

    if (nextLink) {
      const next = nextLink.cloneNode(true);
      next.textContent = '下一篇';
      navContainer.appendChild(next);
    }

    document.getElementById('pinned-ads').appendChild(navContainer);
  }
}

(function () {
  createPinnedArea();
  removeAndPinAds();
  addNavigationLinks();
})();
