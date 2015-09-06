import {ItemView} from 'backbone.marionette';
import template   from './add-todo.template.jade';
import jade       from 'jade';
import Todo       from './todo';
import $          from 'jquery';
import {foo}      from 'jquery-ui'
import CONSTANTS  from '../constants';

export default ItemView.extend({
  tagName: 'div',
  template: template,
  viewOptions: ['todos'],

  ui: {
    'addBtn': '.add-todo-btn',
    'addInput': '.add-todo-input',
    'clearCompleted': '.clear-completed',
    'dateInput': '.datepicker'
  },

  events: {
    'click @ui.addBtn': 'onBtnClick',
    'keypress @ui.addInput': 'onInputKeypress',
    'keypress @ui.dateInput': 'onInputKeypress',
    'click @ui.clearCompleted': 'onClearCompletedClick'
  },

  initialize (options) {
    this.mergeOptions(options, this.viewOptions);
    this.model = new Todo();
  },

  // EVENTS
  onBtnClick (e) {
    this._addTodo();
  },

  onInputKeypress (e) {
    if (e.which === CONSTANTS.ENTER_KEY) {
      this._addTodo();
    }
  },

  onClearCompletedClick (e) {
    this.todos.clearCompleted();
  },

  onRender () {
    this._setFocus();
    $(this.ui.dateInput).datepicker({
      onSelect: () => $(this.ui.addBtn).focus()
    });
  },

  onShow () {
    this._setFocus();
  },


  // HELPER FUNCTIONS
  _addTodo () {
    const text = $(this.ui.addInput).val();
    const dueDate = $(this.ui.dateInput).val();
    this.todos.add({ text, dueDate });
    this.model = new Todo();
    this._updateView();
  },

  _updateView () {
    this.render();
  },

  _setFocus () {
    $(this.ui.addInput).focus();
  }
})
