import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class Incrementer extends Component {
  number = 0;

  @action
  increment() {
    this.set('number', this.number + 1);
  }
}
