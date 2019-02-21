
/* global marked */
import Component from '@glimmer/component';
const tracked = Ember._tracked;

import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { set, get } from '@ember/object';
import { isPresent, isBlank } from '@ember/utils';
import showdown from 'showdown';

import RevealService, { IPresentationState } from 'react-vs-ember/services/reveal-service';


const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  simpleLineBreaks: true,
  openLinksInNewWindow: true,
});

export default class extends Component {
  @service revealService!: RevealService;

  didInsertElement() {
    this.initializeSpeakerNotes();
  }

  @computed
  get currentUrl() {
    let s = location.search;
    let params = 'postMessageEvents=true';
    let qs = isBlank(s) ? `?${params}` : `${s}&${params}`;

    return ['//', location.host, location.pathname, qs].join('');
  }

  @computed
  get upcomingUrl() {
    let s = location.search;
    let params = 'controls=false';
    let qs = isBlank(s) ? `?${params}` : `${s}&${params}`;

    return ['//', location.host, location.pathname, qs].join('');
  }

  notes = null;
  notesValue = null;
  currentState = null;

  currentSlide = null;

  upcomingSlide = null;
  connected = false;

  private initializeSpeakerNotes() {
    this.handleConnectMessage();

    window.addEventListener('message', this.handleRevealMessage.bind(this));
  }

  private handleConnectMessage() {
    this.setupIframes();
    this.setupKeyboard();
    this.setupNotes();
    this.setupTimer();
  }


  private handleRevealMessage(event: any) {
    var revealMessage = event && event.data && event.data.indexOf && (event.data.indexOf("reveal") > 0);
    if (!revealMessage) {
      return;
    }
    // BEGIN-MONKEYPATCH notesjs-locals
    var Reveal = this.currentSlide.contentWindow.Reveal;
    // END-MONKEYPATCH notesjs-locals

    // BEGIN-SNIPPET notesjs-post

    var slideElement = Reveal.getCurrentSlide(),
      notesElement = slideElement.querySelector( 'aside.notes' );

    var messageData = {
      // namespace: 'reveal-notes',
      // type: 'state',
      notes: '',
      markdown: false //,
      // state: Reveal.getState()
    };

    // Look for notes defined in a slide attribute
    if( slideElement.hasAttribute( 'data-notes' ) ) {
      messageData.notes = slideElement.getAttribute( 'data-notes' );
    }

    // Look for notes defined in an aside element
    if( notesElement ) {
      messageData.notes = notesElement.innerHTML;
      messageData.markdown = typeof notesElement.getAttribute( 'data-markdown' ) === 'string';
    }
    // END-SNIPPET notesjs-post

    // BEGIN-MONKEYPATCH handleStateMessage-locals
    var data = JSON.parse( event.data );
    data.notes = messageData.notes;
    data.markdown = messageData.markdown;
    var notes = this.notes;
    var notesValue = this.notesValue;
    var currentSlide = {
      // PATCH: Add || window to support loading slide notes view in main window
      contentWindow: window.opener || window
    };
    var upcomingSlide = this.upcomingSlide;
    // END-MONKEYPATCH handleStateMessage-locals

    // BEGIN-SNIPPET handleStateMessage
    // No need for updating the notes in case of fragment changes
    if ( data.notes ) {
      notes.classList.remove( 'hidden' );
      if( data.markdown ) {
        const html = converter.makeHtml(data.notes);
        notesValue.innerHTML = html;
      }
      else {
        notesValue.innerHTML = data.notes;
      }
    }
    else {
      notes.classList.add( 'hidden' );
    }

    // Update the note slides
    currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
    upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
    upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );
    // END-SNIPPET handleStateMessage

    this.syncRevealState(data.state);

  }

  private syncRevealState(state: IPresentationState) {
    this.revealService.set('indexh', state.indexh);
    this.revealService.set('indexv', state.indexv);

    if (isPresent(state.paused)) {
      this.revealService.set('paused', !!state.paused);
    }
    if (isPresent(state.overview)) {
      this.revealService.set('overview', !!state.overview);
    }
  }

  private setupKeyboard() {
    document.addEventListener( 'keydown', (event) => {
      this.currentSlide.contentWindow.postMessage(
        JSON.stringify({
          method: 'triggerKey',
          args: [ event.keyCode ]
        }),
        '*'
      );
    });
  }

  private setupIframes( /* data */ ) {
    const currentIframe = document.querySelector('#current-slide iframe');
    const upcomingIframe = document.querySelector('#upcoming-slide iframe');

    this.set('currentSlide', currentIframe);
    this.set('upcomingSlide', upcomingIframe);
  }

  private setupNotes() {
    var notes, notesValue;

    notes = document.querySelector( '.speaker-controls-notes' );
    notesValue = document.querySelector( '.speaker-controls-notes .value' );

    set(this, 'notes', notes);
    set(this, 'notesValue', notesValue);
  }

  private setupTimer() {
    var zeroPadInteger = this.zeroPadInteger;

    var start = new Date(),
      timeEl = document.querySelector( '.speaker-controls-time' ),
      clockEl = timeEl!.querySelector( '.clock-value' ),
      hoursEl = timeEl!.querySelector( '.hours-value' ),
      minutesEl = timeEl!.querySelector( '.minutes-value' ),
      secondsEl = timeEl!.querySelector( '.seconds-value' );

    function _updateTimer() {

      var diff, hours, minutes, seconds,
        now = new Date();

      diff = now.getTime() - start.getTime();
      hours = Math.floor( diff / ( 1000 * 60 * 60 ) );
      minutes = Math.floor( ( diff / ( 1000 * 60 ) ) % 60 );
      seconds = Math.floor( ( diff / 1000 ) % 60 );

      clockEl!.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );
      hoursEl!.innerHTML = zeroPadInteger( hours );
      hoursEl!.className = hours > 0 ? '' : 'mute';
      minutesEl!.innerHTML = ':' + zeroPadInteger( minutes );
      minutesEl!.className = minutes > 0 ? '' : 'mute';
      secondsEl!.innerHTML = ':' + zeroPadInteger( seconds );

    }

    // Update once directly
    _updateTimer();

    // Then update every second
    setInterval( _updateTimer, 1000 );

    timeEl!.addEventListener( 'click', function() {
      start = new Date();
      _updateTimer();
      return false;
    } );

  }

  private zeroPadInteger(num) {
    var str = '00' + parseInt( num );
    return str.substring( str.length - 2 );

  }
}
