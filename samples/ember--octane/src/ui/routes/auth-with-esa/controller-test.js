import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | auth-with-esa', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:auth-with-esa');
    assert.ok(controller);
  });
});
