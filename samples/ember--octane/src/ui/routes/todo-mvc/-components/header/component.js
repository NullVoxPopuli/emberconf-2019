import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Header extends Component {
  @service todoManager;

  @tracked text = '';

  didSubmit() {
    this.todoManager.add(this.text);
    this.text = '';
  }
}
