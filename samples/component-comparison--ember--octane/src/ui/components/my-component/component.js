import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MyComponent extends Component {
  @tracked seconds = 0;
  @tracked count = 0;

  get minutes() {
    return this.seconds / 60;
  }

  incrementSeconds() { this.seconds++; }
  bumpTitleCount() { this.count++; }
  clearElapsedTime() { this.seconds = 0; }
}
