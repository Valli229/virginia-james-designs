
(function () {
  const SERVER_URL = 'http://localhost:3000';
  const STORAGE_KEY = 'vjd_photo_likes';

  function loadLikes() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveLikes(obj) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch (e) { console.warn(e); } }

  function sendLikeToServer(src) {
    return fetch(SERVER_URL + '/api/photo-like', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ src: src, timestamp: new Date().toISOString() })
    }).then(r => r.json()).catch(err => { console.warn('Server unavailable', err.message); return null; });
  }

  function updateBadge(button, count) {
    const badge = button.querySelector('.like-count-badge');
    if (badge) badge.textContent = count;
  }

  function attachToImage(img) {
    if (!img || img.dataset.likeAttached) return;
    img.dataset.likeAttached = '1';
    const src = img.getAttribute('src') || img.src;
    const wrapper = document.createElement('span');
    wrapper.className = 'photo-like-overlay';
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    const button = document.createElement('button');
    button.className = 'like-overlay-btn';
    button.type = 'button';
    button.innerHTML = '❤️ <span class="like-count-badge">0</span>';
    wrapper.appendChild(button);

    const likes = loadLikes();
    if (!likes[src]) likes[src] = { count: 0, lastLiked: null };
    updateBadge(button, likes[src].count);

    button.addEventListener('click', function (e) {
      e.stopPropagation();
      likes[src].count += 1;
      likes[src].lastLiked = new Date().toISOString();
      saveLikes(likes);
      updateBadge(button, likes[src].count);
      button.classList.add('liked');
      // send to server
      sendLikeToServer(src).then(resp => {
        if (resp && resp.success) {
          console.log('Like recorded on server', resp);
        }
      });
    });
  }

  function init() {
    document.querySelectorAll('img').forEach(attachToImage);

    // Observe for dynamically added images
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'IMG') attachToImage(node);
            node.querySelectorAll && node.querySelectorAll('img').forEach(attachToImage);
          }
        });
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });

    window.getPhotoLikes = loadLikes;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
