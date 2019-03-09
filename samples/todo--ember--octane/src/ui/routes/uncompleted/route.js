import Route from '@ember/routing/route';

export default class UncompletedRoute extends Route {
  model() {
    return this.store
      .peekAll('todo')
      .filter((todo) => !todo.completed);
  }
}
