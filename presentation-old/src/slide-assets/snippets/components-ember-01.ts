import Ember from 'ember';

export default Ember.Component.extend({
  number: 0,

  actions: {
    increment() {
      this.set('number', this.get('number') + 1);
    }
  }
});