import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { alias, equal, filterBy, gt } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @service todoManager;
  @service router;

  @alias('router.currentRouteName') routeName;
  @equal('routeName', 'index') showAll;
  @equal('routeName', 'uncompleted') showActive;
  @equal('routeName', 'completed') showCompleted;

  @filterBy('todos', 'completed', true) completedTodos;

  @alias('todos.length') todosCount;

  @gt('todosCount', 0) showClearButton;

  @computed('todosCount')
  get itemWord() {
    return this.todosCount > 1 ? 'items' : 'item';
  }

  @action clearCompleted() {
    this.todoManager.clearCompleted();
  }
}
