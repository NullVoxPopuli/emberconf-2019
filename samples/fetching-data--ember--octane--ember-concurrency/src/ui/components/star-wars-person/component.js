import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class StarWarsPerson extends Component {
  @tracked data;

  @task * fetchData() {
    let response = yield fetch('https://swapi.co/api/people/1');
    let json = yield response.json();

    this.data = json;
  }
}
