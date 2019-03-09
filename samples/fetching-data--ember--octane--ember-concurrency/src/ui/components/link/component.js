import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class Link extends Component {
  @service router;

  get isActive() {
    return this.router.currentURL === this.url;
  }

  get url() {
    let { to, queryParams } = this.args;

    return this.router.urlFor(to, { queryParams });
  }

  onClick(e) {
    e.preventDefault();

    let { to, queryParams } = this.args;

    this.router.transitionTo(to, { queryParams });
  }
}
