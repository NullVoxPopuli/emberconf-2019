import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TodoItem extends Component {
  @service todoManager;

  @tracked editing = false;

  @action setElement(element) {
    this.element = element;
  }

  @action didClickLabel() {
    this.startEditing();
    this.focusInput();
  }

  @action destroyTodo() {
    this.todos.destroyTodo(this.todo.id);
  }

  @action didFinishEditing(e) {
    const text = e.target.value;

    this.todos.changeText(this.todo.id, text);
    this.doneEditing();
  }

  @action focusInput() {
    const element = this.element;
    const input = element.querySelector('input.edit')

    input.focus();
  }

  @action handleKeydown(e) {
    // Tab, Enter, Escape
    if ([9, 13, 27].includes(e.target.keyCode)) {
      e.target.blur();
      this.doneEditing();
    }
  }

  startEditing() {
    this.editing = true;
  }

  doneEditing() {
    this.editing = false;
  }

}
