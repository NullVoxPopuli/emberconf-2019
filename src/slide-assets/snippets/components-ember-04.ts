import Component from '@ember/component';

export default class Incrementer extends Component {
  number = 0;

  actions = {
    increment() {
      this.set('number', this.number + 1);
    }
  }
}
