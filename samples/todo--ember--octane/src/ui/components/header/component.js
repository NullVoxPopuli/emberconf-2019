import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Header extends Component {
  @service todos;

  @tracked text = '';

  @action didSubmit() {
    this.todos.add(this.text);
    this.text = '';
  }
}
