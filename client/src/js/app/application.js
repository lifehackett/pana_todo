import Backbone      from 'backbone';
import {Application} from 'backbone.marionette';

import Layout        from './layout-view';

const App = Application.extend({
  onStart (options) {
    Backbone.history.start();
    this.layout = new Layout();
    this.layout.render()
  }
})

export default new App();
