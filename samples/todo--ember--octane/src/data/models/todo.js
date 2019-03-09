import Model from 'ember-data/model';
import DS from 'ember-data';
const { attr } = DS;

export default class Todo extends Model {
  @attr('string') text;
  @attr('boolean') completed;
}
