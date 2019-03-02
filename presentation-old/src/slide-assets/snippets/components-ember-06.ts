import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Incrementer extends Component {
  @tracked number = 0;

  increment() {
    this.number++;
  }
}
