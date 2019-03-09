import Route from '@ember/routing/route';

export default class CompletedRoute extends Route {
  model() {
    return this.store
      .peekAll('todo')
      .filter((todo) => todo.completed);
  }
}
