import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TodoItem extends Component {
  @service todoManager;

  @tracked editing = false;

  setElement(element) {
    this.element = element;
  }

  didClickLabel() {
    this.startEditing();
    this.focusInput();
  }

  destroyTodo() {
    this.todoManager.destroyTodo(this.args.todo.id);
  }

  didFinishEditing(e) {
    const text = e.target.value;

    this.todoManager.changeText(this.args.todo.id, text);
    this.doneEditing();
  }

  focusInput() {
    const element = this.element;
    const input = element.querySelector('input.edit')

    input.focus();
  }

  handleKeydown(e) {
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
