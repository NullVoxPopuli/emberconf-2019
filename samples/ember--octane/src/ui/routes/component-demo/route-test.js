import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | component-demo', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:component-demo');
    assert.ok(route);
  });
});
