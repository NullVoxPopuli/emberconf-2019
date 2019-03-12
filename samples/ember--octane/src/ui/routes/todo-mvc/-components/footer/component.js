import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class extends Component {
  @service todoManager;

  get todosCount() {
    return this.todoManager.current.length;
  }

  get itemWord() {
    return this.todosCount > 1 ? 'items' : 'item';
  }

  clearCompleted() {
    this.todoManager.clearCompleted();
  }

  toAll() {
    this.todoManager.activeFilter = 'all';
  }

  toCompleted() {
    this.todoManager.activeFilter = 'completed';
  }

  toActive() {
    this.todoManager.activeFilter = 'uncompleted';
  }

  get isAll() {
    return this.todoManager.activeFilter === 'all';
  }

  get isCompleted() {
    return this.todoManager.activeFilter === 'completed';
  }

  get isActive() {
    return this.todoManager.activeFilter === 'uncompleted';
  }
}
