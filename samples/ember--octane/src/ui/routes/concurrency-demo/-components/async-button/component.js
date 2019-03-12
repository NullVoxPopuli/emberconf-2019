import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { timeout, task as ecTask } from 'ember-concurrency';
import { task, lastValue } from 'ember-concurrency-decorators';

// export default class AsyncButton extends Component {
export default class AsyncButton extends Component.extend({
  clickTask: ecTask(function*(e) {
    yield timeout(1000);

    this.clickCount++;

    return `${e.x} x ${e.y}`;
  })
}) {
  @tracked clickCount = 0;

  @lastValue('clickTask') lastCoords;

  // @task * clickTask(e) {
  //   yield timeout(2000);

  //   this.clickCount++;

  //   return `${e.x} x ${e.y}`;
  // }
}
