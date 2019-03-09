import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  // beforeModel(transition) { }
  async model() {
    let response = await fetch('https://swapi.co/api/people/1');
    let json = await response.json();

    return { person: json };
  }
  // afterModel(resolvedModel, transition) { }
}
