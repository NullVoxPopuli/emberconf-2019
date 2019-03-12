import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class TodoList extends Component {
  @service todoManager;

  get todos() {
    return this.todoManager.current;
  }
}
