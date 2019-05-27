angular.
  module('store')
  .component('headersection', {
    template: '<h1 flex style="padding-left: 20px">Kube Store</h1> \
     <div style="padding-right: 20px">login</div>',
    controller: function() {
      this.user = 'world';
    }
  });
