const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../public/count-first-touch.js'), 'utf8');
const bio = '?acquisition_source=tiktok&campaign=notes_upgrade_exp1&content=notes_list_v1&utm_source=tiktok&utm_medium=organic_social&utm_campaign=notes_upgrade_exp1&utm_content=notes_list_v1';
function visit(search, values = new Map(), denied = false) {
  const context = {
    window: {}, URLSearchParams, location: { search },
    localStorage: {
      getItem: key => { if (denied) throw Error('denied'); return values.get(key) ?? null; },
      setItem: (key, value) => { if (denied) throw Error('denied'); values.set(key, value); },
    },
  };
  vm.runInNewContext(source, context);
  return { api: context.window.countFirstTouch, values, context };
}
test('locked URL persists attribution before navigation and displays claim code', () => {
  const { api, values, context } = visit(bio);
  assert.equal(api.websiteCode(), 'NOTES1');
  assert.equal(values.get('count_ft_campaign'), 'notes_upgrade_exp1');
  assert.equal(values.get('count_ft_content'), 'notes_list_v1');
  assert.equal(values.get('count_ft_source'), 'tiktok');
  assert.equal(context.location.search, bio);
});
test('later visits cannot overwrite first touch or mix campaign tuples', () => {
  const { values } = visit(bio);
  const later = visit('?acquisition_source=other&campaign=other', values);
  assert.equal(later.api.websiteCode(), 'NOTES1');
  assert.equal(later.api.capture().campaign, 'notes_upgrade_exp1');
});
test('UTM fallbacks work and explicit parameters take precedence', () => {
  assert.equal(visit('?utm_source=tiktok&utm_campaign=notes_upgrade_exp1&utm_content=notes_list_v1&utm_medium=organic_social').api.websiteCode(), 'NOTES1');
  assert.equal(visit(bio.replace('acquisition_source=tiktok', 'acquisition_source=other')).api.websiteCode(), null);
});
test('organic, partial and unrelated visits do not receive the Exp1 code', () => {
  const organic = visit('');
  assert.equal(organic.api.capture().source, 'unknown');
  assert.equal(visit(bio, organic.values).api.websiteCode(), null);
  assert.equal(visit('?acquisition_source=tiktok').api.websiteCode(), null);
  assert.equal(visit(bio.replace('notes_list_v1', 'different')).api.websiteCode(), null);
});
test('storage denial does not crash the CTA; corrupt storage can recover', () => {
  const denied = visit(bio, new Map(), true);
  assert.equal(denied.api.websiteCode(), 'NOTES1');
  assert.equal(denied.values.size, 0);
  assert.equal(visit(bio, new Map([['count_first_touch_v1', '{bad']])).api.websiteCode(), 'NOTES1');
});
test('PII-like, oversized and arbitrary extra parameters are not persisted', () => {
  const { api, values } = visit('?acquisition_source=name@example.com&campaign=' + 'x'.repeat(100) + '&email=name@example.com&notes=private');
  assert.equal(api.capture().source, 'unknown');
  assert.equal(api.capture().campaign, '');
  assert.doesNotMatch(values.get('count_first_touch_v1'), /example|private|email/);
});
