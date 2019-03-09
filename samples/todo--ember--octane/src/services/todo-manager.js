import Service from '@ember/service';
import { inject as service } from '@ember/service';

import uuid from 'uuid';

export default class TodosService extends Service {
  @service store;

  all() {
    return this.store.peekAll('todo');
  }

  completed() {
    return this.all().filter(todo => todo.completed);
  }

  add(text) {
    const todo = {
      id: uuid(),
      completed: false,
      text
    };

    this.store.createRecord('todo', todo);
  }

  find(id) {
    return this.store.peekRecord('todo', id);
  }

  destroyTodo(id) {
    const record = this.find(id);

    if (record) {
      record.deleteRecord();
    }
  }

  clearCompleted() {
    this.completed().forEach(todo => {
      todo.deleteRecord();
    });
  }

  changeText(id, text) {
    const todo = this.find(id);

    if (todo) {
      todo.set('text', text);
    }
  }

  length() {
    return this.store.peekAll('todo').length;
  }

  numCompleted() {
    return this.completed().length;
  }
}

