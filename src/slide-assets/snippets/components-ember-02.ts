import Component from '@ember/component';

export default Component.extend({
  number: 0,

  actions: {
    increment() {
      this.set('number', this.get('number') + 1);
    }
  }
});
