import Component from '@glimmer/component';
import config from 'emberconf-2019/config/environment';
import { inject as service } from '@ember/service';

export default class Image extends Component {
  // @service assetMap;

  // rootURL = config.routerRootURL || config.rootURL;

  get path() {
    return `images/${this.args.of}`;
    // return this.assetMap.resolve(`images/${this.args.of}`) || this.args.of;
  }
}
