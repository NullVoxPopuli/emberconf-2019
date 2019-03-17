import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class Login extends Component {
  @service auth0;
}
