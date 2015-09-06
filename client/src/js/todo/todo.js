import Backbone from 'backbone'

export default Backbone.Model.extend({
  defaults: {
    text: '',
    isComplete: false,
    dueDate: null
  },

  complete () {
    this.set({ isComplete: true })
  },

  isEmpty () {
    return !this.get('text');
  },

  isComplete () {
    return this.get('isComplete');
  }
});
