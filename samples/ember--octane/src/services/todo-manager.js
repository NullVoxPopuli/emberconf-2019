import Service from '@ember/service';
import uuid from 'uuid';
import Ember from 'ember';
import { tracked } from '@glimmer/tracking';

export default class TodosService extends Service {
  @tracked todos = [];
  @tracked activeFilter = 'all';

  get all() {
    return this.todos;
  }

  get completed() {
    return this.all.filter(todo => todo.completed);
  }

  get uncompleted() {
    return this.all.filter(todo => !todo.completed);
  }

  get current() {
    return this[this.activeFilter];
  }

  add(text) {
    this.todos = this.todos.concat({
      id: uuid(),
      completed: false,
      text
    });
  }

  find(id) {
    return this.todos.find(todo => todo.id === id);
  }

  destroyTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed)
  }

  changeText(id, text) {
    const todo = this.find(id);

    if (todo) {
      Ember.set(todo, 'text', text);
    }
  }

  length() {
    return this.todos.length;
  }

  numCompleted() {
    return this.completed().length;
  }
}
