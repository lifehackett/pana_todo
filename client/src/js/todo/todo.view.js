import {ItemView}            from 'backbone.marionette';
import jade                  from 'jade';
import $                     from 'jquery';

import completedTodoTemplate from './completed-todo.template.jade';
import emptyTodoTemplate     from './empty-todo.template.jade';
import Todo                  from './todo';
import todoTemplate           from './todo.template.jade';

export default ItemView.extend({
  tagName: 'li',
  className: 'todo-item',
  model: Todo,

  ui: {
    'checkmark': '.complete-todo',
    'times': '.remove-todo',
  },

  events: {
    'click @ui.checkmark': 'onCheckmarkClick',
    'click @ui.times': 'onRemoveClick'
  },

  getTemplate () {
    if (this.model.isComplete()) {
      return completedTodoTemplate;
    }

    if (this.model.isEmpty()) {
      return emptyTodoTemplate;
    }

    return todoTemplate;
  },

  // EVENTS
  onCheckmarkClick (e) {
    this.model.complete();
  },

  onRemoveClick (e) {
    this.model.collection.remove(this.model);
  }
})
