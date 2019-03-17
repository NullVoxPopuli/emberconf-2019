import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class AuthController extends Controller {
  @service auth0;
}
