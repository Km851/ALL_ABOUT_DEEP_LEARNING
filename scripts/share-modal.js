/* share-modal.js – safe local stub (no DOM lookups, no addEventListener) */
if (typeof window.shareMindmap !== 'function') {
  window.shareMindmap = function() {
    try {
      var url = window.location.href;
      if (navigator.clipboard) { navigator.clipboard.writeText(url); }
      else { prompt('Copy this link:', url); }
    } catch(e) { console.warn('share stub error', e); }
  };
}

