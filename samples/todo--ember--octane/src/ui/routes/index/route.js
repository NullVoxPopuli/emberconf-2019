import Route from '@ember/routing/route';

export default class ApplicationIndexRoute extends Route {
  model() {
    return this.store.peekAll('todo');
  }
}
