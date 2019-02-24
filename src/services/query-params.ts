import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { observes } from '@ember-decorators/object';
import * as qs from 'qs';

interface QueryParams {
  [key: string]: number | string | undefined | QueryParams;
}

interface QueryParamsByPath { [key: string]: QueryParams; }

export default class QueryParamsService extends Service {
  @service router: any;

  @tracked current: QueryParams = {};
  @tracked byPath: QueryParamsByPath = {};

  init() {
    this.updateParams();
    // this.updateLocation();
  }

  @observes('router.currentURL')
  urlObserver() {
    this.updateParams();
  }

  @observes('current')
  qpObserver() {
    this.updateLocation();
  }

  private updateLocation() {
    console.log(window.location.search, this.current);
    const [path, params] = this.router.currentURL.split('?');
    const queryParams = params && qs.parse(params);

    if (Object.keys(queryParams)[0] === Object.keys(this.current)[0]) {
      console.log('location matches');
      return;
    }

    // the URL does not match the state of current query params,
    // update the URL.
    window.location.search = qs.stringify(this.current);
  }

  private updateParams() {
    const [path, params] = this.router.currentURL.split('?');
    const queryParams = params && qs.parse(params);

    // TODO: probably have to use define property here
    //       maybe need a way to work in tracked?

    Object.keys(queryParams || {}).forEach(key => {
      let value = queryParams[key];
      let currentValue = this.current[key];

      if (currentValue === value) {
        return;
      }

      Object.defineProperty(this.current, key, {
        configurable: false,
        enumerable: false,
        get() {
          return value;
        },
        set(newValue) {
          window.location.search = qs.stringify({ ...this.current, [key]: newValue });
        }
      });
    });


    this.byPath[path] = this.current;
    console.log(this.current);
  }
}
