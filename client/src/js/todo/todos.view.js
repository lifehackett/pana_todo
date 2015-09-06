import {CollectionView} from 'backbone.marionette';

import Todo             from './todo';
import Todos            from './todos';
import ChildView        from './todo.view';

export default CollectionView.extend({
  tagName: 'ul',
  childView: ChildView,
  model: Todo,

  initialize (options) {
    this.collection = options.todos;
    this.showCompleted = options.showCompleted;
    this.listenTo(this.collection, 'change:isComplete', this.todoCompleted);
  },

  todoCompleted () {
    this.render();
  }
})