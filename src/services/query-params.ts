import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { observes } from '@ember-decorators/object';
import * as qs from 'qs';

interface QueryParams {
  [key: string]: number | string | undefined | QueryParams;
}

interface QueryParamsByPath { [key: string]: QueryParams; }

const queryParamHandler = {
  get(obj: any, key: string) {
    return Reflect.get(...arguments);
  },
  set(obj: any, key: string, value: any) {
    let { protocol, host, pathname } = window.location;
    let query = qs.stringify({ ...obj, [key]: value });
    let newUrl = `${protocol}//${host}${pathname}?${query}`;

    window.history.pushState({ path: newUrl }, '', newUrl);

    return Reflect.set(...arguments); // success
  }
}

export default class QueryParamsService extends Service {
  @service router: any;

  _current: QueryParams = {};
  @tracked current!: QueryParams;
  @tracked byPath: QueryParamsByPath = {};

  constructor() {
    super(...arguments);

    this.setupProxies();
  }

  init() {
    this.updateParams();
    // this.updateLocation();
  }

  // For when ember wants to make a change to the route
  // @observes('router.currentURL')
  // urlObserver() {
  //   this.updateParams();
  // }

  // for when the path changes outside of ember
  // @observes('current')
  // qpObserver() {
  //   this.updateLocation();
  // }

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

  private setupProxies() {
    this.current = new Proxy(this._current, queryParamHandler);
  }

  private updateParams() {
    const [path, params] = this.router.currentURL.split('?');
    const queryParams = params && qs.parse(params);

    Object.keys(queryParams || {}).forEach(key => {
      let value = queryParams[key];
      let currentValue = this.current[key];

      if (currentValue === value) {
        return;
      }

      this.current[key] = value;
    });


    this.byPath[path] = this.current;
    console.log(this._current);
  }
}
