import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | auth-with-esa', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:auth-with-esa');
    assert.ok(route);
  });
});
