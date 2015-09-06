import Backbone  from 'backbone';
import _         from 'underscore';

import CONSTANTS from '../constants';
import Todo      from './todo';

export default Backbone.Collection.extend({
    model: Todo,

    initialize () {
      this.listenTo(this, 'add', this.onAdd);
      this.listenTo(this, 'remove', this.onRemove);
      this.on('change:isComplete', this.onComplete, this);
    },

    // EVENTS
    onAdd () {
      if (this._areTooManyTodos()) {
        this._removeAnEmptyTodo();
      }
    },

    onRemove() {
      if (this._areTooFewTodos()) {
        this.add(new Todo());
      }
    },

    onComplete () {
      this.sort(this.comparator);
    },

    // Sort order
    // 1) Not Empty. Not Complete
    // 2) Not Empty. Complete
    // 3) Empty
    comparator (model1, model2) {
      const model1Val = this._assignSortValue(model1);
      const model2Val = this._assignSortValue(model2);

      //Compare the model values
      if (model1Val < model2Val) {
        return -1;
      }

      if (model1Val > model2Val) {
        return 1;
      }

      // Both models have same value.  Used cid to determine order
      // Model added first will have lower cid
      return model1.cid < model2.cid ? -1 : 1;
    },

    // PUBLIC FUNCTIONS
    clearCompleted () {
      this.remove(this._getCompleted());
    },

    // PRIVATE HELPERS
    _assignSortValue (model) {
      if (model.isEmpty()) {
        return 1;
      } else if (model.isComplete()) {
        return 0;
      } else {
        return -1
      }
    },

    _getCompleted () {
      return this.filter(todo => todo.isComplete());
    },

    _areTooManyTodos () {
      return this.length > CONSTANTS.MIN_MODEL_COUNT;
    },

    _areTooFewTodos () {
      return this.length < CONSTANTS.MIN_MODEL_COUNT;
    },

    _removeAnEmptyTodo () {
      const emptyTodo = this.findWhere(todo => {
        return todo.isEmpty();
      })

      if (emptyTodo) {
        this.remove(emptyTodo);
      }
    }
})

