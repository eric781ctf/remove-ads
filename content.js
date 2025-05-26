function isAdElement(el) {
  const adKeywords = ['ad', 'ads', 'sponsor', 'banner'];
  return adKeywords.some(keyword => el.className?.toLowerCase().includes(keyword));
}

function createPinnedArea() {
  if (document.getElementById('pinned-ads')) return;

  const pinnedArea = document.createElement('div');
  pinnedArea.id = 'pinned-ads';
  document.body.appendChild(pinnedArea);
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

function removeAndPinAds() {
  const candidates = document.querySelectorAll('iframe, div, section');
  const pinnedArea = document.getElementById('pinned-ads');

  candidates.forEach(el => {
    if (isAdElement(el)) {
      const clone = el.cloneNode(true);
      clone.style.width = '100%';
      clone.style.marginBottom = '10px';
      pinnedArea.appendChild(clone);
      el.remove();
    }
  });
}

(function() {
  createPinnedArea();
  removeAndPinAds();
  addNavigationLinks();
})();
