(function () {
  'use strict';
  var key = 'count_first_touch_v1';
  var fields = ['source', 'campaign', 'content', 'medium'];
  var current;
  function label(value) {
    return typeof value === 'string' && /^[a-z0-9_-]{1,36}$/i.test(value.trim())
      ? value.trim() : '';
  }
  function capture() {
    if (current) return current;
    try {
      var stored = JSON.parse(localStorage.getItem(key));
      if (stored && label(stored.source)) {
        current = {};
        fields.forEach(function (field) { current[field] = label(stored[field]); });
        return current;
      }
    } catch { /* Storage can be denied in private/browser modes. */ }
    var query = new URLSearchParams(location.search);
    current = {
      source: label(query.get('acquisition_source')) || label(query.get('utm_source')) || 'unknown',
      campaign: label(query.get('campaign')) || label(query.get('utm_campaign')),
      content: label(query.get('content')) || label(query.get('utm_content')),
      medium: label(query.get('utm_medium')),
    };
    try {
      // One authoritative write prevents partially stored first-touch tuples.
      localStorage.setItem(key, JSON.stringify(current));
      fields.forEach(function (field) {
        localStorage.setItem('count_ft_' + field, current[field]);
      });
    } catch { /* Keep this visit usable without claiming persistence passed QA. */ }
    return current;
  }
  window.countFirstTouch = {
    capture: capture,
    websiteCode: function () {
      var first = capture();
      // This code represents only the locked Exp1 tuple, never an arbitrary visit.
      return first.source === 'tiktok' && first.campaign === 'notes_upgrade_exp1' &&
        first.content === 'notes_list_v1' && first.medium === 'organic_social' ? 'NOTES1' : null;
    },
  };
  capture();
}());
