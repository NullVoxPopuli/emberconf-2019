import Ember from 'ember';
import Service from '@ember/service';

const tracked = Ember._tracked;

export interface IPresentationState {
  indexh: number | null;
  indexv: number | null;
  paused: boolean;
  overview: boolean;
}

export default class RevealService extends Service {
  @tracked indexh = null;
  @tracked indexv = null;
  @tracked paused = false;
  @tracked overview = false;
  @tracked controls = true;
  @tracked isSpeakerNotes = false;

  get presentationState(): IPresentationState {
    return {
      indexh: this.indexh,
      indexv: this.indexv,
      paused: this.paused,
      overview: this.overview,
    };
  }
}
