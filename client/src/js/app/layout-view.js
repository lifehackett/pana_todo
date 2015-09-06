import {LayoutView} from 'backbone.marionette';
import _            from 'underscore';

import CONSTANTS    from '../constants';
import template     from './layout-template.jade';
import AddTodo      from '../todo/add-todo.view';
import Todo         from '../todo/todo';
import Todos        from '../todo/todos';
import TodoList     from '../todo/todos.view';

export default LayoutView.extend({
  el: '#mount',
  template: template,
  
  regions: {
    addTodo: '.add-todo',
    todoList: '.todo-list'
  },

  onRender () {
    // Seed the todos with empty items so the note page is displayed
    const seedData = _.map(_.range(CONSTANTS.MIN_MODEL_COUNT), () => new Todo());
    const todos = new Todos(seedData);

    this.todoList.show(new TodoList({ todos, showCompleted: false }));
    this.addTodo.show(new AddTodo({ todos }));
  }
});
