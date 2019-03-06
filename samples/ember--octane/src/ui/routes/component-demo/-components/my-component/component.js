import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';

export default class MyComponent extends Component {
  @tracked seconds = 0;
  @tracked count = 0;

  get minutes() {
    return this.seconds / 60;
  }

  /* @action */ incrementSeconds() { this.seconds++; }
  /* @action */ incrementCount() { this.count++; }
  /* @action */ clearElapsedTime() { this.seconds = 0; }
}
