import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import Reveal from 'reveal.js';

import { inject as service } from '@ember/service';
import { observes } from '@ember-decorators/object';
import { isPresent, isBlank } from '@ember/utils';

import QueryParamsService from 'emberconf-2019/src/services/query-params';
import { alias } from '@ember-decorators/object/computed';

export default class Presentation extends Component {
  @service queryParams!: QueryParamsService;

  isSpeakerNotes!: boolean;
  height!: number;
  width!: number;

  // @alias('queryParams.current.c') controls!: boolean;
  get controls() {
    return this.queryParams.current.c === '1';
  }
  set controls(value) {
    console.log('setting', this.queryParams.current, this.queryParams.current.c, value);
    this.queryParams.current.c = (value ? '1': '0');
  }

  @tracked transition = 'none'; // none|fade|slide|convex|concave|zoom
  @tracked backgroundTransition = 'none'; // none/fade/slide/convex/concave/zoom
  @tracked progress = true;
  @tracked center = true;
  @tracked childWindow: any;
  @tracked childWindowInterval?: any;

  @observes('revealService.presentationState')
  presentationStateDidChange() {
    this.setRevealState();
  }

  togglePresenterView() {
    console.log("toggle presenter view");
    this.controls = !this.controls;
    // this.launchSpeakerNotes();
  }

  initializeReveal() {
    console.log('initialize', this.isSpeakerNotes);

    // window.addEventListener('message', function(event) {
    //   let data = JSON.parse(event.data);

    //   if (data.namespace === 'reveal') {
    //     // this.syncRevealState(data);
    //   }
    // });

    if (this.isSpeakerNotes) {
      return;
    }

    Reveal.initialize(this.revealOptions());

    this.setRevealState();
  }

  private revealOptions() {
    let revealOptions: RevealOptions = {
      history: false, // Don't interfere with Ember's routing
      transition: this.transition,
      backgroundTransition: this.backgroundTransition,
      progress: this.progress,
      controls: this.controls,
      center: this.center,
      width: this.width || 1280,
      height: this.height || 720,
      transitionSpeed: 'fast',
      postMessage: true,
      postMessageEvents: true,
    };

    if (this.isSpeakerNotes) {
      revealOptions.showNotes = true;
    }

    return revealOptions;
  }

  private speakerNotesUrl() {
    let ss = 'r=true';
    let s = location.search;
    let qs = isBlank(s) ? `?${ss}` : `${s}&${ss}`;

    return ['//', location.host, location.pathname, qs].join('');
  }

  private launchSpeakerNotes() {
    if (this.isSpeakerNotes || this.childWindow) {
      return;
    }

    const childWindow = window.open(this.speakerNotesUrl(), 'reveal.js - Notes', 'width=1100,height=700');

    this.childWindow = childWindow;

    this.checkForChildWindow();
  }

  checkForChildWindow() {
    let check = () => {
      if (this.childWindow && this.childWindow.closed) {
        this.childWindow = undefined;
        clearInterval(this.childWindowInterval);
      }
    }

    this.childWindowInterval = setInterval(check, 1000);
  }

  private setRevealState() {
    Reveal.setState(this.presentationState);
  }

  get presentationState() {
    return {
      indexh: this.queryParams.current.h,
      indexv: this.queryParams.current.v,
      paused: this.queryParams.current.p,
      controls: this.queryParams.current.c,
      overview: this.queryParams.current.o,
      isSpeakerNotes: this.queryParams.current.r,
    };
  }
}
